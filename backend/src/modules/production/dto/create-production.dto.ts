import {
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  IsUUID,
  IsEnum,
} from 'class-validator';

import { ELocation, EUnit } from '../../../shared/enums/enums';

export class CreateProductionDTO {
  @IsEnum(ELocation)
  @IsNotEmpty()
  location: ELocation;

  @IsEnum(EUnit)
  @IsNotEmpty()
  unit: EUnit;

  @IsNumber()
  @Min(0)
  @Max(1000)
  count: number;

  @IsUUID()
  shiftId: string;
}
