# Etapa 1: Build de React
FROM node:18-alpine AS build
WORKDIR /app
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia los archivos estáticos del build de React
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
