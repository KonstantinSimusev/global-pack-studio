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

import { ProductionRepository } from './production.repository';

import { Shift } from '../shift/entities/shift.entity';
import { Production } from './entities/production.entity';

import { productions } from '../../shared/utils/utils';
import {
  IList,
  IProduction,
  ISuccess,
} from '../../shared/interfaces/api.interface';
import { AuthService } from '../auth/auth.service';
import { UpdateProductionDTO } from './dto/update-production.dto';

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
          createdProduction.sortOrder = production.sortOrder;
          createdProduction.shift = shift;

          return this.productionRepository.create(createdProduction);
        }),
      );

      return {
        message: 'Производства успешно созданы',
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

      const productions =
        await this.productionRepository.findProductionsByShiftId(id);

      return {
        total: productions.length,
        items: productions,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении производств',
      );
    }
  }

  async updateProduction(
    @Body() dto: UpdateProductionDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      await this.authService.validateAccessToken(req, res);

      const production = await this.productionRepository.findById(dto.id);

      if (!production) {
        throw new NotFoundException('Производство не найдено');
      }

      const updateProduction = await this.productionRepository.update(
        production,
        dto,
      );

      if (!updateProduction) {
        throw new NotFoundException('Производство не обновлено');
      }

      return {
        message: 'Производство успешно обновлено',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении производста',
      );
    }
  }
}
