import {
  Injectable,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { ProductionRepository } from './production.repository';

import { Shift } from '../shift/entities/shift.entity';
import { Production } from './entities/production.entity';

import { productions } from '../../shared/utils/utils';
import {
  IList,
  IProduction,
  ISuccess,
} from 'src/shared/interfaces/api.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductionService {
  constructor(
    private readonly authService: AuthService,
    private readonly productionRepository: ProductionRepository,
  ) {}

  async createProductions(shift: Shift): Promise<ISuccess> {
    try {
      await Promise.all(
        productions.map((production) => {
          const createdProduction = new Production();

          createdProduction.location = production.location;
          createdProduction.unit = production.unit;
          createdProduction.count = production.count;
          createdProduction.shift = shift;

          return this.productionRepository.create(createdProduction);
        }),
      );

      return {
        message: 'Произвлдства успешно созданы',
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании производств');
    }
  }

  async getProductions(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IProduction>> {
    try {
      await this.authService.validateAccessToken(req, res);

      const productions = await this.productionRepository.findProductionsByShiftId(id);

      return {
        total: productions.length,
        items: productions,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении списка смен',
      );
    }
  }

  // async updateUserShift(
  //   @Body() dto: UpdateUserShiftDTO,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<ISuccess> {
  //   try {
  //     await this.authService.validateAccessToken(req, res);

  //     const userShift = await this.userShiftRepository.findById(dto.id);

  //     if (!userShift) {
  //       throw new NotFoundException('Смена не найдена');
  //     }

  //     const updateUserShift = await this.userShiftRepository.update(
  //       userShift,
  //       dto,
  //     );

  //     if (!updateUserShift) {
  //       throw new NotFoundException('Смена не обновлена');
  //     }

  //     return {
  //       message: 'Смена пользователя успешно обновлена',
  //     };
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Произошла ошибка при обновлении смены',
  //     );
  //   }
  // }
}
