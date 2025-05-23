# Etapa 1: Construcción de la aplicación
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN chmod +x node_modules/.bin/tsc
RUN npx --no-install tsc -b && npx vite build
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]