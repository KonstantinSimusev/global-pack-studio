import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pack } from './entities/pack.entity';

import { PackController } from './pack.controller';
import { PackService } from './pack.service';
import { PackRepository } from './pack.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pack]), AuthModule],
  controllers: [PackController],
  providers: [PackRepository, PackService],
  exports: [PackService],
})
export class PackModule {}
