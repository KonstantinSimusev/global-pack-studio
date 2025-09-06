import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './app.config';
import cookieParser from 'cookie-parser';

const { port } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Добавляем middleware для работы с cookies
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/gps');
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });
  await app.listen(port);
  console.log(`🚀 Приложение запущено на порту ${port}`);
}
bootstrap();
