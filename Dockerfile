FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

ARG VITE_API_URL_ARG
ENV VITE_API_URL=$VITE_API_URL_ARG

COPY . .

RUN npx tsc -b && npx vite build

# Etapa final: solo archivos estáticos
FROM scratch

COPY --from=builder /app/dist /app/dist
