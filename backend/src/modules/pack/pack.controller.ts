import { Body, Controller, Put, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { PackService } from './pack.service';
import { ISuccess } from '../../shared/interfaces/api.interface';
import { UpdatePackDTO } from './dto/update-pack.dto';

@Controller('packs')
export class PackController {
  constructor(private readonly packService: PackService) {}

  @Put('update-pack')
  async updatePack(
    @Body() dto: UpdatePackDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    return this.packService.updatePack(dto, req, res);
  }
}
