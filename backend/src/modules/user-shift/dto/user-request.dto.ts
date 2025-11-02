import { IsNumber, IsNotEmpty, IsUUID } from 'class-validator';

export class RequestDTO {
  @IsNumber()
  @IsNotEmpty()
  personalNumber: number;

  @IsNotEmpty()
  @IsUUID()
  shiftId: string;
}
