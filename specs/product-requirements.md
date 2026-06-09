# Product Requirements

## Goal
Build an AI Interview Simulator that lets users paste a job description, select an interviewer persona, answer questions by text or microphone, and receive live streamed AI questions and end-of-interview scoring.

## Core user journeys

1. **Launch**
   - User opens app in browser.
   - The client loads the interview UI from Bun static server.

2. **Create interview**
   - User pastes a job description.
   - User selects persona: `friendly`, `tough`, `hr`, or `technical`.
   - User starts interview.

3. **Answer questions**
   - AI streams the first interview prompt via SSE.
   - User answers via text input or mic.
   - The app sends answer plus full chat history to backend.
   - AI streams the next prompt.

4. **Receive scorecard**
   - After 6–8 rounds, AI returns a scorecard wrapped in `<scorecard>` tags.
   - UI parses and renders communication, relevance, and depth scores.

## Must-have features

- Bun-powered static server and backend handler
- Groq `mixtral-8x7b-32768` AI integration with `groq-sdk`
- SSE response streaming for live token rendering
- Frontend state management for `systemPrompt`, `history`, and `userMessage`
- Browser Web Speech API support for voice answer capture
- Scorecard parsing and post-interview feedback

## Non-functional requirements

- Fast startup for hackathon MVP
- Minimal dependencies
- Mobile-friendly SPA layout
- Clear architecture documentation for AI-assisted development
- Low latency from user answer submission to next prompt stream

## Success metrics

- Able to start interview within 5 seconds
- Per-question round-trip latency under 1.5 seconds (best effort)
- Scorecard rendered accurately after completion
- No session persistence required on server

## Constraints

- No backend session storage
- Client must send `systemPrompt` and full history each request
- Use Bun and Groq only; avoid additional AI providers
- Keep frontend framework-free
