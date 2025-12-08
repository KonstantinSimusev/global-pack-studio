import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { AuthService } from '../auth/auth.service';

import { Shift } from './entities/shift.entity';

import { ShiftRepository } from './shift.repository';
import { UserRepository } from '../user/user.repository';
import { UserShiftService } from '../user-shift/user-shift.service';

import { CreateShiftDTO } from './dto/create-shift.dto';

import { IShift, ISuccess } from '../../shared/interfaces/api.interface';
import { compareShifts, getNextShift } from '../../shared/utils/utils';

import { ProductionService } from '../production/production.service';
import { ShipmentService } from '../shipment/shipment.service';
import { PackService } from '../pack/pack.service';
import { FixService } from '../fix/fix.service';
import { ResidueService } from '../residue/residue.service';

@Injectable()
export class ShiftService {
  constructor(
    private readonly authService: AuthService,
    private readonly shiftRepository: ShiftRepository,
    private readonly userRepository: UserRepository,
    private readonly userShiftService: UserShiftService,
    private readonly productionService: ProductionService,
    private readonly shipmentService: ShipmentService,
    private readonly packService: PackService,
    private readonly fixService: FixService,
    private readonly residueService: ResidueService,
  ) {}

  async createShift(
    dto: CreateShiftDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      // Проверяем токен
      await this.authService.validateAccessToken(req, res);

      // Модифицируем дату для смены 1
      let userDate = new Date(dto.date);

      const targetDate = new Date();
      targetDate.setUTCHours(0, 0, 0, 0); // Обнуляем до 00:00:00.000 UTC

      let startShift: Date;
      let endShift: Date;

      if (dto.shiftNumber === 1) {
        // Модифицируем дату для смены 1
        userDate.setUTCDate(userDate.getUTCDate() + 1);

        // Смена 1: 19:30 сегодня → 07:30 завтра
        startShift = new Date(targetDate);
        startShift.setUTCHours(20, 0, 0, 0); // 19:30 текущего дня

        endShift = new Date(targetDate);
        endShift.setUTCDate(endShift.getUTCDate() + 1); // +1 день
        endShift.setUTCHours(8, 0, 0, 0); // 07:30 следующего дня
      } else {
        // Смена 2: 07:30 → 19:30 в тот же день
        startShift = new Date(targetDate);
        startShift.setUTCHours(8, 0, 0, 0);

        endShift = new Date(targetDate);
        endShift.setUTCHours(20, 0, 0, 0);
      }

      // Создаем объект для проверки
      const newShift = new Shift();
      newShift.date = userDate;
      newShift.shiftNumber = dto.shiftNumber;
      newShift.teamNumber = dto.teamNumber;
      newShift.startShift = startShift;
      newShift.endShift = endShift;

      const nextShift = getNextShift(dto.teamNumber);
      const equal = compareShifts(nextShift, newShift);

      if (!equal) {
        throw new ConflictException('Нарушение графика');
      }

      // Проверяем уникальность смены
      const existingShift = await this.shiftRepository.findOne(newShift);

      if (existingShift) {
        throw new ConflictException('Смена уже создана');
      }

      // Сохраняем смену
      const shift = await this.shiftRepository.create(newShift);

      // Получаем пользователей бригады
      const users = await this.userRepository.findUsersByTeam(
        newShift.teamNumber,
      );

      // Создаем связь с userShift
      await this.userShiftService.createUsersShifts(shift, users);

      // Создаем связь с production
      await this.productionService.createProductions(shift);

      // Создаем связь с shipment
      await this.shipmentService.createShipments(shift);

      // Создаем связь с pack
      await this.packService.createPacks(shift);

      // Создаем связь с fix
      await this.fixService.createFixs(shift);

      // Создаем связь с residue
      await this.residueService.createResidues(shift);

      return {
        message: 'Смена успешно создана',
      };
    } catch (error) {

      console.error('=== ОШИБКА В createShift ===');
  console.error('Сообщение:', error.message);
  console.error('Тип ошибки:', error.name);
  console.error('Стек:', error.stack);
  console.error('DTO:', JSON.stringify(dto, null, 2));
  console.error('IP:', req.ip);
  console.error('Путь:', req.path);
  console.error('===========================');

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  async getActiveShift(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IShift> {
    try {
      await this.authService.validateAccessToken(req, res);

      const activeShift = await this.shiftRepository.findActiveShift();

      if (!activeShift) {
        throw new NotFoundException('Идет планирование...');
      }

      return activeShift;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при получении смены',
      );
    }
  }

  async getFinishedShift(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IShift> {
    try {
      await this.authService.validateAccessToken(req, res);

      const finishedShift = await this.shiftRepository.findFinishedShift();

      if (!finishedShift) {
        throw new NotFoundException('Нет данных...');
      }

      return finishedShift;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при получении смены',
      );
    }
  }

  // async deleteShift(
  //   id: string,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<ISuccess> {
  //   try {
  //     // Проверяем токен
  //     await this.authService.validateAccessToken(req, res);

  //     if (!id) {
  //       throw new BadRequestException('ID смены обязателен для удаления');
  //     }

  //     const shift = await this.shiftRepository.findById(id);

  //     if (!shift) {
  //       throw new NotFoundException('Смена не найдена');
  //     }

  //     await this.shiftRepository.delete(id);

  //     return {
  //       message: 'Смена успешно удалена',
  //     };
  //   } catch {
  //     throw new InternalServerErrorException('Ошибка при удалении смены');
  //   }
  // }

  async getLastTeamShift(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IShift> {
    try {
      const { currentTeamNumber } = await this.authService.validateAccessToken(
        req,
        res,
      );

      const shifts =
        await this.shiftRepository.findLastTeamShift(currentTeamNumber);

      if (shifts.length === 0) {
        throw new NotFoundException('Пожалуйста, создайте смену...');
      }

      const lastShift = shifts[0];

      if (!lastShift) {
        throw new NotFoundException('Смена не найдена');
      }

      return lastShift;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  /*
  async getShifts(): Promise<IList<IShift>> {
    try {
      const shifts = await this.shiftRepository.findAll();

      return {
        total: shifts.length,
        items: shifts,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  async getShiftById(id: string): Promise<IShift> {
    try {
      const shift = await this.shiftRepository.findById(id);

      if (!shift) {
        throw new NotFoundException('Смена не найдена');
      }

      return shift;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении смены');
    }
  }

  async updateShift(id: string, updateData: Partial<IShift>): Promise<IShift> {
    try {
      const shift = await this.shiftRepository.findById(id);

      if (!shift) {
        throw new NotFoundException('Смена не найдена');
      }

      return await this.shiftRepository.update(shift, updateData);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении смены');
    }
  }
  */
}
