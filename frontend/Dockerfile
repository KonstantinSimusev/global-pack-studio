# Этап сборки
FROM node:20-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Проверяем содержимое текущей директории перед копированием
RUN ls -la

# Копируем .env файл
COPY .env ./

# Проверяем, что .env появился
RUN ls -la && cat .env

# Определяем ARG до их использования
ARG VITE_API_URL
ARG VITE_CDN_URL

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Устанавливаем переменные окружения
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

# Выполняем сборку проекта
RUN npm run build
