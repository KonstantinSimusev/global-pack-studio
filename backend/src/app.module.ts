import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    // Первый статический модуль
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'dist', 'assets'),
    }),
    // Второй статический модуль с особыми настройками
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'public'),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
