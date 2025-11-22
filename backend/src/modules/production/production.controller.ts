import { Controller, Get, Param, ParseUUIDPipe, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { ProductionService } from './production.service';
import { IList, IProduction } from '../../shared/interfaces/api.interface';

@Controller('productions')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  // @Put('update-production')
  // async updateUserShift(
  //   @Body() dto: UpdateProductionDTO,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<ISuccess> {
  //   return this.productionService.updateProduction(dto, req, res);
  // }
}
