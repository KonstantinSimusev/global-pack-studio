import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shipment } from './entities/shipment.entity';

import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { ShipmentRepository } from './shipment.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]), AuthModule],
  controllers: [ShipmentController],
  providers: [ShipmentRepository, ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
