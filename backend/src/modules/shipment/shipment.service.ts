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

import { ShipmentRepository } from './shipment.repository';

import { Shift } from '../shift/entities/shift.entity';
import { Shipment } from './entities/shipment.entity';

import {
  IList,
  IShipment,
  ISuccess,
} from '../../shared/interfaces/api.interface';
import { AuthService } from '../auth/auth.service';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';

import { shipments } from '../../shared/utils/utils';

@Injectable()
export class ShipmentService {
  constructor(
    private readonly authService: AuthService,
    private readonly shipmentRepository: ShipmentRepository,
  ) {}

  async createShipments(shift: Shift): Promise<ISuccess> {
    try {
      await Promise.all(
        shipments.map((shipment) => {
          const createdShipment = new Shipment();

          createdShipment.location = shipment.location;
          createdShipment.railway = shipment.railway;
          createdShipment.count = shipment.count;
          createdShipment.sortOrder = shipment.sortOrder;
          createdShipment.shift = shift;

          return this.shipmentRepository.create(createdShipment);
        }),
      );

      return {
        message: 'Отгрузки успешно созданы',
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании отгрузок');
    }
  }

  async getShipments(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IShipment>> {
    try {
      await this.authService.validateAccessToken(req, res);

      const shipments =
        await this.shipmentRepository.findShipmentsByShiftId(id);

      return {
        total: shipments.length,
        items: shipments,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении отгрузок');
    }
  }

  async updateShipment(
    @Body() dto: UpdateShipmentDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      await this.authService.validateAccessToken(req, res);

      const shipment = await this.shipmentRepository.findById(dto.id);

      if (!shipment) {
        throw new NotFoundException('Отгрузка не найдена');
      }

      const updateShipment = await this.shipmentRepository.update(
        shipment,
        dto,
      );

      if (!updateShipment) {
        throw new NotFoundException('Отгрузка не обновлена');
      }

      return {
        message: 'Отгрузка успешно обновлена',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении отгрузки',
      );
    }
  }
}
