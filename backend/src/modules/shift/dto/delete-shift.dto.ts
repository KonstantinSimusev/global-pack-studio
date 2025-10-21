import { IsUUID } from 'class-validator';

export class DeleteDTO {
  @IsUUID()
  id: string;
}
