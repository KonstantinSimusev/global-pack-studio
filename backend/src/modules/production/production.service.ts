import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ProductionRepository } from './production.repository';

import { Shift } from '../shift/entities/shift.entity';
import { Production } from './entities/production.entity';

import { productions } from '../../shared/utils/utils';

@Injectable()
export class ProductionService {
  constructor(private readonly productionRepository: ProductionRepository) {}

  async createProductions(shift: Shift): Promise<Production[]> {
    try {
      return await Promise.all(
        productions.map((production) => {
          const createdProduction = new Production();

          createdProduction.location = production.location;
          createdProduction.unit = production.unit;
          createdProduction.count = production.count;
          createdProduction.shift = shift;

          return this.productionRepository.create(createdProduction);
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании смены');
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
