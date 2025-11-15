import { Controller } from '@nestjs/common';

import { ProductionService } from './production.service';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  // @Post('create')
  // async createProduction(
  //   @Body() dto: CreateProductionDTO,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<IProduction> {
  //   return this.productionService.createProduction(dto, req, res);
  // }

  // @Put('update')
  // async updateUserShift(
  //   @Body() dto: UpdateProductionDTO,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<ISuccess> {
  //   return this.productionService.updateProduction(dto, req, res);
  // }
}
