FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/drizzle ./drizzle

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Create non-privileged user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 ortho

USER ortho

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/server/index.js"]
