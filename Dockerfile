# -------------------------------
# Stage 1: Build
# -------------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Copy Prisma schema first (for postinstall hooks)
COPY prisma ./prisma

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Generate Prisma client
RUN npx prisma generate --no-engine

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# -------------------------------
# Stage 2: Production Runtime
# -------------------------------
FROM node:18-alpine AS runner
WORKDIR /app

# Install OpenSSL for runtime
RUN apk add --no-cache openssl

# Copy Prisma schema
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built app and required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose Next.js default port
EXPOSE 3000

# Create uploads directory with proper permissions
RUN mkdir -p /app/public/uploads && \
    addgroup -S nodejs && adduser -S nextjs -G nodejs && \
    chown -R nextjs:nodejs /app && \
    chmod -R 755 /app/public/uploads

USER nextjs

CMD ["npm", "run", "start"]
