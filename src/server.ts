import Groq from 'groq-sdk';
import { readFileSync } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const defaultGroqKey = process.env.GROQ_API_KEY;
const client = new Groq({
  apiKey: defaultGroqKey,
});

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

const PORT = process.env.PORT || 3000;

// ── Static file helpers ────────────────────────────────────────────────────
const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

function serveStatic(filePath: string): Response {
  try {
    const ext = path.extname(filePath);
    const content = readFileSync(filePath);
    return new Response(content, {
      headers: { 'Content-Type': MIME[ext] ?? 'text/plain' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function getErrorMessage(error: unknown, fallback: string): string {
  const nestedMessage = (error as { error?: { error?: { message?: unknown } } })?.error?.error
    ?.message;
  if (nestedMessage) return String(nestedMessage);
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'object' && error && 'message' in error) {
    return String((error as { message?: unknown }).message || fallback);
  }
  return fallback;
}

async function extractTextFromResume(fileBuffer: ArrayBuffer, fileName: string): Promise<string> {
  const ext = path.extname(fileName).toLowerCase();
  const buffer = Buffer.from(fileBuffer);

  if (ext === '.txt') {
    return normalizeText(buffer.toString('utf-8'));
  }

  if (ext === '.pdf') {
    const parsed = await pdfParse(buffer);
    return normalizeText(parsed.text || '');
  }

  if (ext === '.docx') {
    const result = await mammoth.extractRawText({ buffer });
    return normalizeText(result.value || '');
  }

  throw new Error('Resume format not supported. Please upload PDF, DOCX, or TXT.');
}

function normalizeModelByProvider(requestedModel: string | undefined, provider: string): string {
  const candidate = String(requestedModel || '').trim();
  if (provider === 'ollama') {
    return /^ *(llama|alpaca|vicuna|wizard)/i.test(candidate) ? candidate : 'llama2';
  }
  return candidate.startsWith('groq/') ? candidate || 'groq/compound-mini' : 'groq/compound-mini';
}

// ── System prompt builder ─────────────────────────────────────────────────
function buildSystemPrompt(jobDescription: string, persona: string, resumeText?: string): string {
  const personas: Record<string, string> = {
    friendly:
      'You are a warm, encouraging interviewer. You ask follow-up questions, smile through text, and create a supportive atmosphere — but still probe for real depth.',
    tough:
      "You are a no-nonsense senior engineering interviewer at a top-tier company. You push back on vague answers, ask 'why?', and don't let candidates off the hook. Direct, demanding, fair.",
    hr: "You are an HR generalist conducting a behavioural screen. You focus on culture fit, communication style, and STAR-method answers. You use phrases like 'Tell me about a time when...'",
    technical:
      'You are a principal engineer conducting a deep technical interview. You dive into system design, trade-offs, and past technical decisions. You ask for specific examples, metrics, and lessons learned.',
  };

  return `${personas[persona] || personas.friendly}

${resumeText ? `The candidate's resume summary is below:\n---\n${resumeText}\n---\n` : ''}
You are interviewing a candidate for the following role:
---
${jobDescription}
---

RULES:
- Ask one question at a time. Never ask two questions in the same message.
- Keep your messages concise — 2–4 sentences max.
- After the candidate answers, give ONE sentence of reaction (e.g. "Good, I like the specificity there." or "That's a bit vague — can you give me a concrete example?"), then ask your next question.
- Start with an intro line and your first question. Do not say "Hello" or use filler.
- After 6–8 exchanges, wrap up with a brief 3-sentence scorecard: Communication (X/10), Relevance (X/10), Depth (X/10), and one sentence of overall feedback.
- The scorecard must be wrapped in <scorecard> tags exactly like this:
  <scorecard>Communication: 8/10 | Relevance: 7/10 | Depth: 6/10 | Overall: Strong communication but could give more specific examples.</scorecard>`;
}

// ── Route handlers ─────────────────────────────────────────────────────────

async function handleStartInterview(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as {
      jobDescription: string;
      persona: string;
      model?: string;
      provider?: 'groq' | 'ollama' | string;
      apiKey?: string; // BYOK support
      temperature?: number;
      resumeText?: string;
    };
    const {
      jobDescription,
      persona,
      model: requestedModel,
      provider,
      apiKey,
      temperature,
      resumeText,
    } = body;

    if (!jobDescription?.trim()) {
      return Response.json({ error: 'Job description is required' }, { status: 400 });
    }

    const systemPromptBase = buildSystemPrompt(jobDescription, persona || 'friendly', resumeText);
    const lang = (body as any).language || 'en';
    const langInstruction =
      lang === 'hi'
        ? '\n\nPlease respond in Hindi.'
        : lang === 'te'
          ? '\n\nPlease respond in Telugu.'
          : '';
    const systemPrompt = systemPromptBase + langInstruction;

    const chosenProvider =
      provider || (String(requestedModel).toLowerCase().includes('ollama') ? 'ollama' : 'groq');
    const model = normalizeModelByProvider(requestedModel, chosenProvider);

    // If API key provided in the request (BYOK), use it for Groq
    const effectiveClient = apiKey ? new Groq({ apiKey }) : client;

    let stream: AsyncIterable<any>;

    if (chosenProvider === 'ollama') {
      // Ollama local inference: build a single prompt and call local Ollama HTTP API
      const prompt = `${systemPrompt}\n\nBegin the interview.`;
      const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, temperature, stream: false }),
      });
      if (!resp.ok) throw new Error(`Ollama error: ${resp.statusText}`);
      // Parse Ollama's response - it returns a single JSON object with 'response' field
      const data = await resp.json();
      const text = data.response || '';
      stream = (async function* () {
        yield { choices: [{ delta: { content: text } }] } as any;
      })();
    } else {
      stream = await effectiveClient.chat.completions.create({
        model,
        max_tokens: 400,
        temperature: typeof temperature === 'number' ? temperature : undefined,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Begin the interview.' },
        ],
        stream: true,
      });
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        // Send the system prompt back so the client can store it for future turns
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'system', content: systemPrompt })}\n\n`)
        );

        for await (const event of stream) {
          if (event.choices[0]?.delta?.content) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'delta', content: event.choices[0].delta.content })}\n\n`
              )
            );
          }
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return Response.json(
      { error: getErrorMessage(error, 'Unable to start interview') },
      { status: (error as { status?: number })?.status || 500 }
    );
  }
}

async function handleReply(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as {
      systemPrompt: string;
      history: { role: 'user' | 'assistant'; content: string }[];
      userMessage: string;
      model?: string;
      provider?: 'groq' | 'ollama' | string;
      apiKey?: string; // BYOK support
      temperature?: number;
    };

    const {
      systemPrompt,
      history,
      userMessage,
      model: requestedModel,
      provider,
      apiKey,
      temperature,
    } = body;

    const lang = (body as any).language || 'en';

    const messages = [...history, { role: 'user' as const, content: userMessage }];

    const chosenProvider =
      provider || (String(requestedModel).toLowerCase().includes('ollama') ? 'ollama' : 'groq');
    const model = normalizeModelByProvider(requestedModel, chosenProvider);
    const effectiveClient = apiKey ? new Groq({ apiKey }) : client;

    let stream: AsyncIterable<any>;

    if (chosenProvider === 'ollama') {
      const langInstruction =
        lang === 'hi'
          ? '\n\nPlease respond in Hindi.'
          : lang === 'te'
            ? '\n\nPlease respond in Telugu.'
            : '';
      const prompt = `${systemPrompt}${langInstruction}\n\n${messages.map((m) => `[${m.role}] ${m.content}`).join('\n')}`;
      const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, temperature, stream: false }),
      });
      if (!resp.ok) throw new Error(`Ollama error: ${resp.statusText}`);
      // Parse Ollama's response - it returns a single JSON object with 'response' field
      const data = await resp.json();
      const text = data.response || '';
      stream = (async function* () {
        yield { choices: [{ delta: { content: text } }] } as any;
      })();
    } else {
      stream = await effectiveClient.chat.completions.create({
        model,
        max_tokens: 400,
        temperature: typeof temperature === 'number' ? temperature : undefined,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: true,
      });
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.choices[0]?.delta?.content) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'delta', content: event.choices[0].delta.content })}\n\n`
              )
            );
          }
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return Response.json(
      { error: getErrorMessage(error, 'Unable to send reply') },
      { status: (error as { status?: number })?.status || 500 }
    );
  }
}

async function handleUploadResume(req: Request): Promise<Response> {
  try {
    const form = await req.formData();
    const file = form.get('resume');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'Resume is required' }, { status: 400 });
    }

    const name = file.name || 'resume';
    const resumeText = await extractTextFromResume(await file.arrayBuffer(), name);
    return Response.json({ resumeText, fileName: name });
  } catch (error) {
    return Response.json({ error: error?.message || 'Unable to parse resume' }, { status: 400 });
  }
}

// ── Main server ────────────────────────────────────────────────────────────
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'POST' && url.pathname === '/api/start') {
      return handleStartInterview(req);
    }
    if (req.method === 'POST' && url.pathname === '/api/reply') {
      return handleReply(req);
    }
    if (req.method === 'POST' && url.pathname === '/api/upload-resume') {
      return handleUploadResume(req);
    }

    // Static files
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return serveStatic(path.join(import.meta.dir, '../public/index.html'));
    }

    const staticPath = path.join(import.meta.dir, '../public', url.pathname);
    return serveStatic(staticPath);
  },
});

console.log(`\n🎤 Interview Simulator running at http://localhost:${PORT}\n`);
