import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserShift } from '../user/entities/user-shift.entity';
import { UserShiftController } from './user-shift.controller';
import { UserShiftRepository } from './user-shift.repository';
import { UserShiftService } from './user-shift.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserShift])],
  controllers: [UserShiftController],
  providers: [UserShiftRepository, UserShiftService],
  exports: [UserShiftService],
})
export class UserShiftModule {}
