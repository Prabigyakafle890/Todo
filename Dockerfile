FROM oven/bun:1.3.9 AS base
WORKDIR /usr/src/app

COPY package.json bun.lockb* ./

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN bun run build

# Expose port
EXPOSE 3000

# Start server using Bun
CMD ["bun", "run", "preview", "--", "--port", "3000", "--host"]
