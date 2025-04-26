# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile || yarn install --frozen-lockfile
RUN npm run build || yarn build

# Etapa 2: Imagem para produção
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copia apenas os arquivos necessários do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "npm", "start" ]