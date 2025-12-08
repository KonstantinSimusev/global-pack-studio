import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shift } from './entities/shift.entity';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UserShiftModule } from '../user-shift/user-shift.module';
import { ProductionModule } from '../production/production.module';
import { ShipmentModule } from '../shipment/shipment.module';
import { PackModule } from '../pack/pack.module';
import { FixModule } from '../fix/fix.module';
import { ResidueModule } from '../residue/residue.module';

import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { ShiftRepository } from './shift.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift]),
    UserModule,
    AuthModule,
    ProductionModule,
    ShipmentModule,
    PackModule,
    FixModule,
    ResidueModule,
    forwardRef(() => UserShiftModule),
  ],
  controllers: [ShiftController],
  providers: [ShiftRepository, ShiftService],
  exports: [ShiftRepository, ShiftService],
})
export class ShiftModule {}
