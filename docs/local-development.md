# Local Development

## Start the development environment

```bash
cd /home/rupesh-kumar/Desktop/interview-simulator./
export GROQ_API_KEY=your_groq_api_key
bun run src/server.ts
```

## Recommended workflow

- Edit `src/server.ts` for backend logic
- Edit `public/index.html` for frontend UI
- Keep static assets in `public/`
- Use browser devtools to inspect SSE events and network payloads

## Debugging tips

- Verify `GROQ_API_KEY` is present in the shell
- Confirm `bun run src/server.ts` starts without compile errors
- Check the browser console for JavaScript errors
- Inspect network requests for `/api/start` and `/api/reply`

## AI response validation

- Ensure streamed payloads include `data: {...}` messages
- Confirm the final output contains `<scorecard>` tags
- If the model output is malformed, fine-tune the prompt in `src/server.ts`

## Frontend state tracking

- Keep `systemPrompt` in memory until interview ends
- Append assistant messages after streaming completes
- Append user messages when answers are submitted
- Reset state cleanly on restart
