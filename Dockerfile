# Etapa 1: Construcción
FROM node:20-alpine AS builder 
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM nginx:alpine 
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Instala envsubst para procesar variables
RUN apk add --no-cache gettext

# Script de entrada para procesar variables
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]