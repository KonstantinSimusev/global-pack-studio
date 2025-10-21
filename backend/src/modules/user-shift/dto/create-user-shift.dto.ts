import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserShiftDTO {
  @IsString()
  @IsNotEmpty()
  attendance: string;

  @IsNumber()
  @Min(0)
  @Max(20)
  hoursWorked: number;

  @IsString()
  @IsOptional()
  section: string;

  @IsString()
  @IsOptional()
  shiftProfession: string;
}