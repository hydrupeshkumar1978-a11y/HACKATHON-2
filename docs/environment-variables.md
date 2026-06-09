# Environment Variables

## Required variables

- `GROQ_API_KEY`
  - Description: API key used to authenticate with Groq
  - Example: `export GROQ_API_KEY=gsk_...`

## Optional variables

- `PORT`
  - Description: Port for the Bun server
  - Default: `3000`
  - Example: `export PORT=4000`

## Security guidance

- Never commit `GROQ_API_KEY` to git
- Use environment-specific secret stores for production
- Rotate keys periodically and update deployment config

## Local development

```bash
export GROQ_API_KEY=your_groq_api_key
export PORT=3000
bun run src/server.ts
```
