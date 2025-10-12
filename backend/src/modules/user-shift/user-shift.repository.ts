import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserShift } from './entities/user-shift.entity';
import { CreateUserShiftDTO } from './dto/create-user-shift.dto';

@Injectable()
export class UserShiftRepository {
  constructor(
    @InjectRepository(UserShift)
    private readonly userShiftRepository: Repository<UserShift>,
  ) {}

  async findUserShifts(): Promise<UserShift[]> {
    try {
      const userShifts = await this.userShiftRepository.find({
        relations: ['user', 'shift'],
      });
      return userShifts;
    } catch (error) {
      // Логируем полную информацию об ошибке
      console.error('Ошибка в findUsers():', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        sql: error.sql,
        parameters: error.parameters,
      });
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  async create(userData: CreateUserShiftDTO): Promise<UserShift> {
    try {
      const newUserShift = this.userShiftRepository.create(userData);
      return await this.userShiftRepository.save(newUserShift);
    } catch {
      throw new InternalServerErrorException(
        'Ошибка при создании пользовательской смены',
      );
    }
  }
}
