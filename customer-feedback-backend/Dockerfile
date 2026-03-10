FROM node:20.20.1-alpine AS build
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm ci
 
COPY . ./
 
 
# build NestJS app
RUN npx prisma generate
RUN npm run build



 
# remove dev dependencies
RUN npm prune --production
 
 
# ---------- Runtime Stage ----------
FROM node:20.20.1-alpine
 
WORKDIR /app
 
ENV NODE_ENV=production

RUN apk add --no-cache netcat-openbsd

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package*.json /app/
COPY prisma.config.ts ./prisma.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json
 
EXPOSE 3000
 
# Run migrations and seed AFTER container starts
CMD ["sh", "-c", "until nc -z db 5432; do echo 'waiting for postgres'; sleep 2;done && npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"]
