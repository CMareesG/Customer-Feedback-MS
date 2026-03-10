# ---------- Build Stage ----------
FROM node:20.20.1-alpine AS build

WORKDIR /app
COPY package*.json ./
# Use ci for a cleaner, faster install
RUN npm ci
COPY . .

# Generate Prisma Client (crucial for build)
RUN npx prisma generate
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# ---------- Runtime Stage ----------
FROM node:20.20.1-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install netcat to check DB readiness
RUN apk add --no-cache netcat-openbsd

# Copy only what is needed from build stage
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/prisma ./prisma
# COPY --from=build /app/package*.json ./

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package*.json /app/
COPY prisma.config.ts ./prisma.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json
 

EXPOSE 3000

# Logic: Wait for DB -> Deploy Migrations -> Start App
# Note: Ensure your seed script in package.json points to a .js file
CMD ["sh", "-c", "until nc -z db 5432; do echo 'Waiting for DB...'; sleep 2; done; npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"]