FROM oven/bun:latest

WORKDIR /app

# Copy project files and install dependencies with Bun (image already contains bun)
COPY . /app
RUN bun install

EXPOSE 3000

CMD ["bun", "run", "src/server.ts"]
