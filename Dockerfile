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

# Copy env file if exists (or use build args)
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXT_PUBLIC_BASE_URL
ARG RESEND_API_KEY
ARG FROM_EMAIL
ARG CONTACT_EMAIL

# Write the env variables inside the build
RUN echo 'DATABASE_URL=${{ secrets.DATABASE_URL }}' >> .env.production && \
    echo 'AUTH_SECRET=${{ secrets.AUTH_SECRET }}' >> .env.production && \
    echo 'NEXTAUTH_URL=https://deepakroy.dev' >> .env.production && \
    echo 'NEXTAUTH_SECRET=${{ secrets.NEXTAUTH_SECRET }}' >> .env.production && \
    echo 'GITHUB_CLIENT_ID=${{ secrets.GHUB_CLIENT_ID }}' >> .env.production && \
    echo 'GITHUB_CLIENT_SECRET=${{ secrets.GHUB_CLIENT_SECRET }}' >> .env.production && \
    echo 'GOOGLE_CLIENT_ID=${{ secrets.GOOGLE_CLIENT_ID }}' >> .env.production && \
    echo 'GOOGLE_CLIENT_SECRET=${{ secrets.GOOGLE_CLIENT_SECRET }}' >> .env.production && \
    echo 'NODE_ENV=production' >> .env.production && \
    echo 'NEXT_PUBLIC_BASE_URL=https://deepakroy.dev' >> .env.production && \
    echo 'RESEND_API_KEY=${{ secrets.RESEND_API_KEY }}' >> .env.production && \
    echo 'FROM_EMAIL=${{ secrets.FROM_EMAIL }}' >> .env.production && \
    echo 'CONTACT_EMAIL=${{ secrets.CONTACT_EMAIL }}' >> .env.production && \

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
