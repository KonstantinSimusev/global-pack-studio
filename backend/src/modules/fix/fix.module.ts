import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fix } from './entities/fix.entity';

import { FixController } from './fix.controller';
import { FixService } from './fix.service';
import { FixRepository } from './fix.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fix]), AuthModule],
  controllers: [FixController],
  providers: [FixRepository, FixService],
  exports: [FixService],
})
export class FixModule {}
