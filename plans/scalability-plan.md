# Scalability Plan

## Objective
Outline clean architecture recommendations and scaling ideas for the Bun + SSE interview project.

## Current MVP scale

- Single Bun instance
- Stateless request handling
- Direct Groq API calls
- Client-driven history

## Scalability goals

- Keep the backend stateless
- Add a lightweight proxy layer if needed
- Support more concurrent SSE clients
- Optimize prompt and payload size

## Architecture recommendations

- Use Bun for low-latency event streaming
- Keep SSE connections short-lived where possible
- Avoid server-side history to simplify scaling
- Add an API gateway or edge cache in later phases

## Horizontal scale

- Deploy multiple Bun instances behind a load balancer
- Use sticky sessions only if the frontend requires connection affinity
- Keep AI requests independent

## Possible optimizations

- Reduce response size by streaming delta text only
- Precompute static `systemPrompt` on the client for repeated rounds
- Reuse the same SSE connection for multiple question rounds if supported
- Offload TLS termination to a CDN or edge proxy

## Monitoring and observability

- Track request latency for `/api/start` and `/api/reply`
- Capture SSE connection duration
- Monitor Groq API error rates
- Add minimal request tracing headers

## Future architecture ideas

- Add a serverless function layer for AI requests
- Use edge caching for `jobDescription` templates
- Introduce federated prompt versioning
- Isolate conversational state in client storage only

## Hackathon scope

- MVP should prioritize correctness over scale
- Build for a few dozen concurrent users in the first iteration
- Document future scaling work rather than implementing it immediately
