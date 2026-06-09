import Groq from "groq-sdk";
import { readFileSync } from "fs";
import path from "path";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const PORT = process.env.PORT || 3000;

// ── Static file helpers ────────────────────────────────────────────────────
const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

function serveStatic(filePath: string): Response {
  try {
    const ext = path.extname(filePath);
    const content = readFileSync(filePath);
    return new Response(content, {
      headers: { "Content-Type": MIME[ext] ?? "text/plain" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

// ── System prompt builder ─────────────────────────────────────────────────
function buildSystemPrompt(jobDescription: string, persona: string): string {
  const personas: Record<string, string> = {
    friendly:
      "You are a warm, encouraging interviewer. You ask follow-up questions, smile through text, and create a supportive atmosphere — but still probe for real depth.",
    tough:
      "You are a no-nonsense senior engineering interviewer at a top-tier company. You push back on vague answers, ask 'why?', and don't let candidates off the hook. Direct, demanding, fair.",
    hr: "You are an HR generalist conducting a behavioural screen. You focus on culture fit, communication style, and STAR-method answers. You use phrases like 'Tell me about a time when...'",
    technical:
      "You are a principal engineer conducting a deep technical interview. You dive into system design, trade-offs, and past technical decisions. You ask for specific examples, metrics, and lessons learned.",
  };

  return `${personas[persona] || personas.friendly}

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
  const body = (await req.json()) as {
    jobDescription: string;
    persona: string;
  };
  const { jobDescription, persona } = body;

  if (!jobDescription?.trim()) {
    return Response.json({ error: "Job description is required" }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(jobDescription, persona || "friendly");

  const stream = await client.messages.create({
    model: "mixtral-8x7b-32768",
    max_tokens: 400,
    system: systemPrompt,
    messages: [{ role: "user", content: "Begin the interview." }],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      // Send the system prompt back so the client can store it for future turns
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "system", content: systemPrompt })}\n\n`
        )
      );

      for await (const event of stream) {
        if (event.choices[0]?.delta?.content) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "delta", content: event.choices[0].delta.content })}\n\n`
            )
          );
        }
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function handleReply(req: Request): Promise<Response> {
  const body = (await req.json()) as {
    systemPrompt: string;
    history: { role: "user" | "assistant"; content: string }[];
    userMessage: string;
  };

  const { systemPrompt, history, userMessage } = body;

  const messages = [
    ...history,
    { role: "user" as const, content: userMessage },
  ];

  const stream = await client.messages.create({
    model: "mixtral-8x7b-32768",
    max_tokens: 400,
    system: systemPrompt,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.choices[0]?.delta?.content) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "delta", content: event.choices[0].delta.content })}\n\n`
            )
          );
        }
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// ── Main server ────────────────────────────────────────────────────────────
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/api/start") {
      return handleStartInterview(req);
    }
    if (req.method === "POST" && url.pathname === "/api/reply") {
      return handleReply(req);
    }

    // Static files
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveStatic(
        path.join(import.meta.dir, "../public/index.html")
      );
    }

    const staticPath = path.join(
      import.meta.dir,
      "../public",
      url.pathname
    );
    return serveStatic(staticPath);
  },
});

console.log(`\n🎤 Interview Simulator running at http://localhost:${PORT}\n`);
