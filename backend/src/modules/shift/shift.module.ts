import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shift } from './entities/shift.entity';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UserShiftModule } from '../user-shift/user-shift.module';

import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { ShiftRepository } from './shift.repository';
import { ProductionModule } from '../production/production.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift]),
    UserModule,
    AuthModule,
    ProductionModule,
    forwardRef(() => UserShiftModule),
  ],
  controllers: [ShiftController],
  providers: [ShiftRepository, ShiftService],
  exports: [ShiftRepository, ShiftService],
})
export class ShiftModule {}
