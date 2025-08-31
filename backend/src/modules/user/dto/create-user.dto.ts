import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  login: string;

  @IsString()
  @MinLength(8)
  password: string;
}
