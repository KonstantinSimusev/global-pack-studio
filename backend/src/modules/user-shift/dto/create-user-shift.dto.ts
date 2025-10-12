import {
  IsUUID,
  IsString,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserShiftDTO {
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @IsUUID('4')
  @IsNotEmpty()
  shiftId: string;

  @IsString()
  @IsNotEmpty()
  attendance: string;

  @IsNumber()
  @Min(0)
  @Max(20)
  hoursWorked: number;

  @IsString()
  section: string | null;

  @IsString()
  shiftProfession: string | null;
}