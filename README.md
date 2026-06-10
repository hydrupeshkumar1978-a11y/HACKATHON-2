# 🎤 AI Interview Simulator

A real-time AI interview coach — paste a job description, pick your interviewer style, speak or type your answers, and get a live scorecard at the end.

---

## Quick start

```bash
# Install dependencies
bun install

# Add your Groq API key
export GROQ_API_KEY=gsk-...

# Run
bun dev
# → http://localhost:3000
```

---

## Architecture

```
interview-simulator/
├── src/
│   └── server.ts        # Bun HTTP server + Groq streaming
├── public/
│   └── index.html       # Full SPA (setup UI + chat UI + scorecard)
├── package.json
└── README.md
```

### How it works

```
Browser                          Bun Server                    Groq API
  │                                   │                               │
  │── POST /api/start ──────────────► │                               │
  │   { jobDescription, persona }     │── stream request ────────────►│
  │                                   │◄─ SSE delta tokens ───────────│
  │◄── SSE (system + delta tokens) ───│                               │
  │                                   │                               │
  │  [user types/speaks answer]       │                               │
  │── POST /api/reply ──────────────► │                               │
  │   { systemPrompt, history,        │── stream request ────────────►│
  │     userMessage }                 │◄─ SSE delta tokens ───────────│
  │◄── SSE (delta tokens) ────────────│                               │
```

**Key design decisions:**

- **Stateless server** — the client holds `systemPrompt` + full `history` and sends them with every request. Zero session storage needed.
- **Streaming SSE** — Groq responses stream token-by-token. The UI renders it live, which looks great in demos.
- **Web Speech API** — mic input is handled entirely in the browser. No audio ever hits the server.
- **Scorecard parsing** — the model wraps its final scorecard in `<scorecard>` tags. The frontend parses this and renders animated score bars.

---

## Personas

| Persona | Style |
|---------|-------|
| `friendly` | Warm and encouraging, still asks follow-ups |
| `tough` | Senior engineer, no vague answers tolerated |
| `hr` | Behavioural, STAR-method, culture fit |
| `technical` | Deep dives, system design, trade-offs |

---

## Extending it

**Add voice output (TTS)**
```ts
// Stream Groq's reply text to ElevenLabs or use browser SpeechSynthesis:
const utterance = new SpeechSynthesisUtterance(fullText);
window.speechSynthesis.speak(utterance);
```

**Add a timer per answer**
Track `Date.now()` when the user starts speaking and show elapsed time in the UI — recruiters love this metric.

**Export transcript as PDF**
After the scorecard renders, add a button that calls `window.print()` or uses a library like `jsPDF` to export the full conversation.

**Multi-round practice mode**
Store `history` in `localStorage` keyed by job title — users can resume a practice session later.

---

## Stack

- **Runtime**: Bun
- **AI**: Groq Compound Mini (`groq/compound-mini`) via `groq-sdk`
- **Streaming**: Server-Sent Events (SSE)
- **Speech**: Web Speech API (browser-native, no extra dependency)
- **Frontend**: Vanilla JS SPA — no framework needed

### Features added

- Model selector and temperature control on the setup screen (sent to server)
- Resume upload support for PDF, DOCX, and TXT files with text extraction
- Per-job session persistence and restore (localStorage)
- Text-to-speech playback for assistant replies (toggleable in setup)
- Review & Export transcript (JSON / TXT)
- API debug panel showing last request and streaming response preview
- Keyboard shortcuts: `Ctrl/Cmd+S` to start/send, `Ctrl/Cmd+R` to open review, `Esc` to close modals
- Light theme by default with an optional dark mode toggle
