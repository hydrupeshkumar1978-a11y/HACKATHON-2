# Realtime Streaming Specification

## Purpose
Document how the application handles realtime token streaming from Groq to browser clients using Server-Sent Events (SSE).

## Streaming lifecycle

1. **Client initiates request**
   - `/api/start` or `/api/reply` is called via `fetch`
   - Response type is `text/event-stream`

2. **Server opens SSE**
   - Bun responds with headers:
     - `Content-Type: text/event-stream`
     - `Cache-Control: no-cache`
     - `Connection: keep-alive`

3. **AI stream tokens**
   - Groq streams incremental content via an async iterator
   - Server converts token deltas into SSE `data:` messages

4. **Browser receives updates**
   - Frontend listens to `EventSource` or manual fetch stream reader
   - Each delta is appended to the current assistant message

5. **Stream close**
   - Server emits a final `done` event
   - Browser closes the event stream and transitions UI state

## SSE example

```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"type":"delta","content":"Hello"}

data: {"type":"delta","content":" there."}

data: {"type":"done"}

```

## Server-side streaming pseudocode

```ts
const stream = await client.messages.create({
  model: "mixtral-8x7b-32768",
  system: systemPrompt,
  messages,
  stream: true,
});

for await (const event of stream) {
  if (event.choices[0]?.delta?.content) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({type:"delta", content:event.choices[0].delta.content})}\n\n`));
  }
}
```

## Error handling

- Emit an SSE event with `type: error` when the AI stream fails
- Fallback to a JSON error response for request-level failures
- Frontend should show a retry CTA

## Performance note

- Keep SSE payloads small and frequent
- Avoid bundling multiple token deltas into one large event
- Use Bun’s low-latency streaming support to minimize buffering

## Future enhancements

- Add heartbeat or ping events to keep connections alive
- Support reconnect logic for transient network issues
- Use delta compression if response size grows significantly
