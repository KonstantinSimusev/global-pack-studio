import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UserShiftRepository } from './user-shift.repository';

@Injectable()
export class UserShiftService {
  constructor(private readonly userShiftRepository: UserShiftRepository) {}

  async getUserShifts() {
    try {
      const userShifts = await this.userShiftRepository.findUserShifts();

      // Преобразуем все сущности
      const result = userShifts;

      return {
        total: result.length,
        items: result,
      };
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }
}
