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

import { IList, IShift, ISuccess } from '../../shared/interfaces/api.interface';
import { compareShifts, getNextShift } from '../../shared/utils/utils';
import { ProductionService } from '../production/production.service';

@Injectable()
export class ShiftService {
  constructor(
    private readonly authService: AuthService,
    private readonly shiftRepository: ShiftRepository,
    private readonly userRepository: UserRepository,
    private readonly userShiftService: UserShiftService,
    private readonly productionService: ProductionService,
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

      if (dto.shiftNumber === 1) {
        userDate.setDate(userDate.getDate() + 1);
      }

      // Создаем объект для проверки
      const newShift = new Shift();
      newShift.date = userDate;
      newShift.shiftNumber = dto.shiftNumber;
      newShift.teamNumber = dto.teamNumber;

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

      return {
        message: 'Смена успешно создана',
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  async deleteShift(
    id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      // Проверяем токен
      await this.authService.validateAccessToken(req, res);

      if (!id) {
        throw new BadRequestException('ID смены обязателен для удаления');
      }

      const shift = await this.shiftRepository.findById(id);

      if (!shift) {
        throw new NotFoundException('Смена не найдена');
      }

      await this.shiftRepository.delete(id);

      return {
        message: 'Смена успешно удалена',
      };
    } catch {
      throw new InternalServerErrorException('Ошибка при удалении смены');
    }
  }

  async getTeamShifts(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IShift>> {
    try {
      const { currentTeamNumber } = await this.authService.validateAccessToken(
        req,
        res,
      );

      const lastShifts =
        await this.shiftRepository.findLastShift(currentTeamNumber);

      return {
        total: lastShifts.length,
        items: lastShifts,
      };
    } catch (error) {
      console.log(error);
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
