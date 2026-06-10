FROM jarredsumner/bun:latest
WORKDIR /app
COPY . /app
RUN bun install
EXPOSE 3000
CMD ["bun", "run", "src/server.ts"]
