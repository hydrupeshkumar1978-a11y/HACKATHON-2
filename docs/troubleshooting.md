# Troubleshooting

## Common issues

### `GROQ_API_KEY` missing

Symptom: Bun server fails with a Groq auth error.

Fix:

```bash
export GROQ_API_KEY=your_groq_api_key
bun run src/server.ts
```

### SSE not streaming

Symptom: browser receives no incremental updates.

Fix:

- Verify Bun response headers include `text/event-stream`
- Confirm the backend is yielding events as they arrive
- Check for proxy or CDN buffering

### Scorecard not parsed

Symptom: final feedback does not render.

Fix:

- Ensure model emits `<scorecard>` and `</scorecard>` exactly
- Validate frontend parser handles the exact format

### Speech not working

Symptom: microphone recording does not start.

Fix:

- Confirm browser supports Web Speech API
- Ensure microphone permission is granted
- Fallback to text if the API is unavailable

## Debugging steps

1. Open browser devtools
2. Inspect network calls to `/api/start` and `/api/reply`
3. Check SSE payloads for `delta` and `done`
4. Confirm `systemPrompt` and `history` are included in request body

## Performance tips

- Keep prompt and history payload sizes moderate
- Avoid sending excessively long job descriptions
- Use Bun’s streaming support to reduce latency
- If latency spikes, verify Groq API response times
