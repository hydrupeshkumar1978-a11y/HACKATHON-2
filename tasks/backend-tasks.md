# Backend Tasks

## API implementation

- [ ] Implement `POST /api/start` in Bun server
- [ ] Implement `POST /api/reply` in Bun server
- [ ] Validate request payloads for required fields
- [ ] Build deterministic `systemPrompt`
- [ ] Proxy Groq streaming output to SSE

## Streaming and SSE

- [ ] Add `Content-Type: text/event-stream`
- [ ] Add `Cache-Control: no-cache`
- [ ] Add `Connection: keep-alive`
- [ ] Handle `done` event emission
- [ ] Handle Groq stream errors cleanly

## Error handling

- [ ] Return `400` for validation failures
- [ ] Emit an SSE `error` object on stream failure
- [ ] Make Groq auth failures readable
- [ ] Prevent broken stream from hanging the response

## Backend developer notes

- Keep the server stateless
- Avoid storing history on the server
- Use helper functions for prompt construction
- Keep the routing simple and explicit
