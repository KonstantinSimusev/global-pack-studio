import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNumber()
  @IsNotEmpty()
  positionCode: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  patronymic: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  profession: string;

  @IsNumber()
  @IsNotEmpty()
  personalNumber: number;

  @IsNumber()
  @IsNotEmpty()
  teamNumber: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  workSchedule: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  workshopCode: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(512)
  password: string;
}
