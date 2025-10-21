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

import { ShiftRepository } from './shift.repository';

import { CreateShiftDTO } from './dto/create-shift.dto';
import {
  IList,
  IShift,
  ISuccess,
  IUserShift,
} from '../../shared/interfaces/api.interface';
import { getNextShift, compareShifts } from '../../shared/utils/utils';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class ShiftService {
  constructor(
    private readonly shiftRepository: ShiftRepository,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async createShift(dto: CreateShiftDTO): Promise<IShift> {
    try {
      // Модифицируем дату для смены 1
      let userDate = new Date(dto.date);

      if (dto.shiftNumber === 1) {
        userDate.setDate(userDate.getDate() + 1);
      }

      // Создаем объект для проверки
      const newShift = {
        date: userDate,
        shiftNumber: dto.shiftNumber,
        teamNumber: dto.teamNumber,
      };

      const nextShift = getNextShift(dto.teamNumber);
      const equal = compareShifts(nextShift, newShift);

      if (!equal) {
        throw new ConflictException('Нарушение графика');
      }

      // Проверяем уникальность смены
      const existingShift = await this.shiftRepository.findShift(dto);

      if (existingShift) {
        throw new ConflictException('Смена уже создана');
      }


      // const teamUsers = await this.userRepository.findUsersByTeam(
      //   newShift.teamNumber,
      // );

      // Создаем связи user_shifts
      // const userShifts = teamUsers.map((user) => ({
      //   id: null,
      //   workStatus: 'Явка',
      //   workPlace: 'ЛПЦ-11',
      //   shiftProfession: user.profession,
      //   workHours: 11.5,
      //   userId: user.id,
      //   shiftId: undefined, // будет установлено после создания смены
      //   user: user,
      //   shift: null,
      // }));

      // const createdShift = this.shiftRepository.create({
      //   ...newShift,
      //   userShifts,
      // });

      // await this.shiftRepository.create(newShift);

      return ;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

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

  async deleteShift(id: string): Promise<ISuccess> {
    try {
      if (!id) {
        throw new BadRequestException('ID смены обязателен для обновления');
      }

      await this.shiftRepository.delete(id);

      return {
        message: 'Смена успешно удалена',
      };
    } catch {
      throw new InternalServerErrorException('Ошибка при удалении смены');
    }
  }

  // Специфические методы поиска
  async getTeamShifts(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IShift>> {
    try {
      const { teamNumber } = await this.authService.validateAccessToken(
        req,
        res,
      );

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const shifts = await this.shiftRepository.findTeamShifts(
        teamNumber,
        startOfMonth,
        endOfMonth,
      );

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
}
