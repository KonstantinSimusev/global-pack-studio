import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { IList, IShift } from '../../shared/interfaces/api.interface';
import { ShiftRepository } from './shift.repository';
import { CreateShiftDTO } from './dto/create-shift.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ShiftService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async getShifts(): Promise<IList<IShift>> {
    try {
      const shifts = await this.shiftRepository.findShifts();

      return {
        total: shifts.length,
        items: shifts,
      };
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  async getShiftById(id: string): Promise<IShift> {
    try {
      return await this.shiftRepository.findShiftById(id);
    } catch {
      throw new InternalServerErrorException('Ошибка при получении смены');
    }
  }

  async createShift(shiftData: CreateShiftDTO): Promise<IShift> {
    try {
      return await this.shiftRepository.createShift(shiftData);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Перебрасываем ошибку конфликта
      }

      // Для других ошибок возвращаем внутреннюю ошибку сервера
      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  async updateShift(id: string, updateData: Partial<IShift>): Promise<IShift> {
    try {
      return await this.shiftRepository.updateShift(id, updateData);
    } catch {
      throw new InternalServerErrorException('Ошибка при обновлении смены');
    }
  }

  async deleteShift(id: string): Promise<void> {
    try {
      await this.shiftRepository.deleteShift(id);
    } catch {
      throw new InternalServerErrorException('Ошибка при удалении смены');
    }
  }
}
