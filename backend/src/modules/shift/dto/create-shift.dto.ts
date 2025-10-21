import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { UserShift } from '../../../modules/user-shift/entities/user-shift.entity';

export class CreateShiftDTO {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(2)
  shiftNumber: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  teamNumber: number;

  userShifts: UserShift[];
}
