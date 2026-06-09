# Deployment

## Recommended deployment model

- Deploy Bun as a server process behind a reverse proxy
- Ensure `text/event-stream` is preserved
- Configure environment variables securely

## Host options

- Platform that supports Bun directly
- Container-based deployment with Docker (optional)
- Reverse proxy or CDN for TLS termination

## Server config checklist

- `GROQ_API_KEY` is available in runtime environment
- `PORT` defaults to `3000` if not set
- Static files are served from `public/`
- SSE response headers are forwarded unchanged

## Production considerations

- Use HTTPS for all traffic
- Keep the backend stateless for easier scaling
- Monitor Groq API quota and latency
- Add health checks for `/api/start` or a separate endpoint

## Advanced deployment notes

- If using an edge gateway, confirm SSE is supported
- If using Kubernetes, deploy Bun as a pod with no stateful volume
- Use secret management for `GROQ_API_KEY`
