FROM debian:bookworm-slim

WORKDIR /app

# Install small runtime deps required to fetch and install Bun
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl ca-certificates gnupg2 \
	&& rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . /app

# Install Bun at build time and make it available on PATH, then install node deps
RUN curl -fsSL https://bun.sh/install | bash -s -- --disable-metrics \
	&& ln -s /root/.bun/bin/bun /usr/local/bin/bun \
	&& bun install

EXPOSE 3000

CMD ["/usr/local/bin/bun", "run", "src/server.ts"]
