import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { config } from './app.config';

const { port } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/gps');
  app.enableCors();
  await app.listen(port);
  console.log(`🚀 Приложение запущено на порту ${port}`);
}
bootstrap();
