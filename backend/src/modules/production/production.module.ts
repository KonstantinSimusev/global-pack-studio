import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Production } from './entities/production.entity';

import { ProductionController } from './production.controller';
import { ProductionRepository } from './production.repository';
import { ProductionService } from './production.service';

@Module({
  imports: [TypeOrmModule.forFeature([Production])],
  controllers: [ProductionController],
  providers: [ProductionRepository, ProductionService],
  exports: [ProductionService],
})
export class ProductionModule {}
