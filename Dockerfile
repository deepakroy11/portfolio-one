# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install OpenSSL and other dependencies
RUN apk add --no-cache openssl

# Copy Prisma schema first (needed for postinstall script)
COPY prisma ./prisma

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Generate Prisma client
RUN npx prisma generate --no-engine

# Copy rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Install OpenSSL for production
RUN apk add --no-cache openssl

# Copy Prisma schema first (needed for postinstall script)
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built app and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Only copy next.config.js if it exists
# If you don’t use it, comment this out to avoid checksum errors


# Optional: Copy environment variables
# COPY .env.production .env

# Expose Next.js default port
EXPOSE 3000

# Run as non-root user for security
RUN addgroup -S nodejs || true && adduser -S -G nodejs nextjs || true
USER nextjs


# Final startup command
CMD npx prisma generate && npx prisma migrate deploy && npm run start