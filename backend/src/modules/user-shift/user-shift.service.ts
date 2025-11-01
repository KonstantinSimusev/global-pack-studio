import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { ShiftRepository } from '../shift/shift.repository';
import { UserShiftRepository } from './user-shift.repository';

import { Shift } from '../shift/entities/shift.entity';
import { UserShift } from './entities/user-shift.entity';
import { User } from '../user/entities/user.entity';

import { RequestDTO } from './dto/request.dto';

import {
  IList,
  ISuccess,
  IUserShift,
} from '../../shared/interfaces/api.interface';

@Injectable()
export class UserShiftService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly userShiftRepository: UserShiftRepository,
    private readonly shiftRepository: ShiftRepository,
  ) {}

  async creatUserShift(
    @Body() dto: RequestDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    try {
      await this.authService.validateAccessToken(req, res);

      const shift = await this.shiftRepository.findById(dto.shiftId);

      if (!shift) {
        throw new NotFoundException('Смена не найдена');
      }

      const user = await this.userRepository.findUserByPersonalNumber(
        dto.personalNumber,
      );

      if (!user) {
        throw new NotFoundException('Работник не найден');
      }

      // Проверяем, существует ли уже запись "пользователь + смена"
      const isExisting = await this.userShiftRepository.existsByUserAndShift(
        user.id,
        shift.id,
      );

      if (isExisting) {
        throw new ConflictException('Смена уже создана');
      }

      const createdUserShift = new UserShift();
      createdUserShift.workStatus = 'Явка';
      createdUserShift.workPlace = 'ЛПЦ-11';
      createdUserShift.shiftProfession = user.profession;
      createdUserShift.workHours = 11.5;
      createdUserShift.user = user;
      createdUserShift.shift = shift;

      await this.userShiftRepository.create(createdUserShift);

      return {
        message: 'Смена пользователя успешно создана',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ошибка при создании смены пользователя',
      );
    }
  }

  async createUsersShifts(shift: Shift, users: User[]): Promise<UserShift[]> {
    try {
      return await Promise.all(
        users.map((user) => {
          const createdUserShift = new UserShift();
          createdUserShift.workStatus = 'Явка';
          createdUserShift.workPlace = 'ЛПЦ-11';
          createdUserShift.shiftProfession = user.profession;
          createdUserShift.workHours = 11.5;
          createdUserShift.user = user;
          createdUserShift.shift = shift;

          return this.userShiftRepository.create(createdUserShift);
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  async getUsersShifts(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IUserShift>> {
    try {
      await this.authService.validateAccessToken(req, res);

      const usersShifts =
        await this.userShiftRepository.findUsersShiftsByShiftId(id);

      return {
        total: usersShifts.length,
        items: usersShifts,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении списка смен',
      );
    }
  }
}
