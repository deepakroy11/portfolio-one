#Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /app

#Copy dependency
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all project files and build the app
COPY . .
RUN run build

#Production run time
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built app and production dependencies only
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Expose Next.js default port
EXPOSE 3000

# Recommended: run as non-root for security
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs


# Run the app
CMD ["npm", "run", "start"]