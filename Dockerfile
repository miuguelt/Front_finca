FROM node:20-alpine AS builder
WORKDIR /app

# Copia solo las dependencias para cachear instalaciones
COPY package*.json ./

# Instala dependencias (sin chmod)
RUN npm install --legacy-peer-deps

# Copia el resto de tu código
COPY . .

# Compila la app usando npx para invocar tsc y vite
RUN npx tsc -b && npx vite build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Si tu build está en 'build' o 'dist', ajusta la ruta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]