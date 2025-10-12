import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../modules/user/entities/user.entity';
import { Shift } from '../modules/shift/entities/shift.entity';
import { UserShift } from '../modules/user-shift/entities/user-shift.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const dbUrl = configService.get<string>('DB_ADDRESS');

        return {
          type: 'postgres',
          url: dbUrl,
          entities: [User, Shift, UserShift],
          synchronize: false,
          retryAttempts: 5, // Количество попыток переподключения
          retryDelay: 1000, // Задержка между попытками в миллисекундах
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
