import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserShift } from './entities/user-shift.entity';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ShiftModule } from '../shift/shift.module';

import { UserShiftController } from './user-shift.controller';
import { UserShiftService } from './user-shift.service';
import { UserShiftRepository } from './user-shift.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserShift]),
    UserModule,
    AuthModule,
    forwardRef(() => ShiftModule),
  ],
  controllers: [UserShiftController],
  providers: [UserShiftRepository, UserShiftService],
  exports: [UserShiftRepository, UserShiftService],
})
export class UserShiftModule {}
