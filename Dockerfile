# Etapa 1: Build con Node
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

ARG VITE_API_URL_ARG
ENV VITE_API_URL=$VITE_API_URL_ARG

COPY . .

RUN npx tsc -b && npx vite build

# Etapa 2: Servir archivos estáticos con un servidor simple (serve)
FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]