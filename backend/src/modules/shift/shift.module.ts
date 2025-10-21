import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shift } from './entities/shift.entity';
import { ShiftController } from './shift.controller';
import { ShiftRepository } from './shift.repository';
import { ShiftService } from './shift.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shift]), UserModule, AuthModule],
  controllers: [ShiftController],
  providers: [ShiftRepository, ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
