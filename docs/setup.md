# Setup

## Prerequisites

- `bun` installed
- A Groq API key
- Bash-compatible shell

## Installation

```bash
cd /home/rupesh-kumar/Desktop/interview-simulator./
bun install
```

## Environment

Set your Groq API key before running the app:

```bash
export GROQ_API_KEY=your_groq_api_key
```

## Running the app

```bash
bun run src/server.ts
```

Then open `http://localhost:3000` in your browser.

## Notes

- The app uses Bun for both server and static asset delivery.
- The frontend is a vanilla JS SPA in `public/index.html`.
- The backend proxies AI requests to Groq and streams responses via SSE.
