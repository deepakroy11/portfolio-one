# -------------------------------
# Stage 1: Build
# -------------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Define build argument
ARG AUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BASE_URL

# Make them available inside container environment
ENV AUTH_SECRET=${AUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Copy Prisma schema first (for postinstall hooks)
COPY prisma ./prisma

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Generate Prisma client (without engine to reduce size)
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

# Copy Prisma schema (needed for runtime client)
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built app and required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Optional: If you use next.config.js instead, copy that instead
# COPY --from=builder /app/next.config.js ./next.config.js

# Expose Next.js default port
EXPOSE 3000

# Create uploads directory with proper permissions
RUN mkdir -p /app/public/uploads && \
    addgroup -S nodejs && adduser -S nextjs -G nodejs && \
    chown -R nextjs:nodejs /app && \
    chmod -R 755 /app/public/uploads

USER nextjs

# Final startup command
CMD ["npm", "run", "start"]