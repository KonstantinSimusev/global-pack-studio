import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { PackRepository } from './pack.repository';

import { Shift } from '../shift/entities/shift.entity';
import { Pack } from './entities/pack.entity';

import { IList, IPack, ISuccess } from '../../shared/interfaces/api.interface';
import { AuthService } from '../auth/auth.service';
import { UpdatePackDTO } from './dto/update-pack.dto';

import { packs } from '../../shared/utils/utils';

@Injectable()
export class PackService {
  constructor(
    private readonly authService: AuthService,
    private readonly packRepository: PackRepository,
  ) {}

  async createPacks(shift: Shift): Promise<ISuccess> {
    try {
      await Promise.all(
        packs.map((pack) => {
          const createdPack = new Pack();

          createdPack.location = pack.location;
          createdPack.area = pack.area;
          createdPack.count = pack.count;
          createdPack.sortOrder = pack.sortOrder;
          createdPack.shift = shift;

          return this.packRepository.create(createdPack);
        }),
      );

      return {
        message: 'Упаковки успешно созданы',
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании упаковок');
    }
  }

  async getPacks(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IPack>> {
    try {
      await this.authService.validateAccessToken(req, res);

      const packs = await this.packRepository.findPacksByShiftId(id);

      return {
        total: packs.length,
        items: packs,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении упаковок');
    }
  }

  async updatePack(
    @Body() dto: UpdatePackDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      await this.authService.validateAccessToken(req, res);

      const pack = await this.packRepository.findById(dto.id);

      if (!pack) {
        throw new NotFoundException('Упаковка не найдена');
      }

      const updatePack = await this.packRepository.update(pack, dto);

      if (!updatePack) {
        throw new NotFoundException('Упаковка не обновлена');
      }

      return {
        message: 'Упаковка успешно обновлена',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении упаковки',
      );
    }
  }
}
