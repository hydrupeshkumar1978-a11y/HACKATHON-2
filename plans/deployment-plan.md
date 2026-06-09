# Deployment Plan

## Goal
Provide a minimal, reliable deployment path for the Bun-based interview simulator suitable for early production and hackathon demos.

## Targets
- Single-instance droplet or VM (e.g., DigitalOcean)
- Containerized deployment (optional) using Docker
- Edge-enabled deployment with TLS + reverse proxy

## Steps (simple VM)
1. Provision VM with Node-compatible environment.
2. Install Bun and clone repo.
3. Set environment variables (`GROQ_API_KEY`, `PORT`).
4. Run `bun install` and `bun run src/server.ts` under a process manager (e.g., `systemd` or `pm2` that supports Bun).
5. Configure `nginx` as reverse proxy for TLS termination and to forward SSE correctly.

## Steps (containerized)
1. Add a lightweight `Dockerfile` (Bun binary + app files).
2. Build and run container behind Traefik or nginx with TLS.
3. Use environment secrets for `GROQ_API_KEY`.

## Example `systemd` unit

```ini
[Unit]
Description=Interview Simulator (Bun)
After=network.target

[Service]
User=app
WorkingDirectory=/srv/interview-simulator
Environment=GROQ_API_KEY=...
ExecStart=/home/app/.bun/bin/bun run src/server.ts
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Reverse proxy config (nginx example)

```nginx
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_http_version 1.1;
    proxy_set_header Connection ""; # ensure SSE works
    proxy_buffering off;              # important for SSE
  }
}
```

## Health checks and monitoring
- Expose a `/healthz` endpoint returning 200
- Monitor process uptime and memory
- Track Groq API error rates and latency

## Rollback strategy
- Keep previous image or binary available
- Use blue-green or simple restart with previous commit

## Security
- Protect `GROQ_API_KEY` via secrets manager
- Use HTTPS for all traffic
- Limit SSH access and enable 2FA on provider account

## Notes for hackathon MVP
- Manual deploy to a small VM is fastest
- Containerization is optional and added if time permits
