# Этап сборки
FROM node:20-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Используем ARG для передачи переменных сборки
ARG VITE_API_URL
ARG VITE_CDN_URL

# Устанавливаем переменные окружения
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

# Выполняем сборку проекта
RUN npm run build
