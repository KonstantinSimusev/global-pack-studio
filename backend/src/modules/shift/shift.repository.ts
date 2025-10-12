import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Shift } from './entities/shift.entity';
import { CreateShiftDTO } from './dto/create-shift.dto';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async findShifts(): Promise<Shift[]> {
    try {
      const shifts = await this.shiftRepository.find({
        order: {
          shiftNumber: 'ASC',
          date: 'DESC', // Сортировка по убыванию
        },
      });
      return shifts;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка смен',
      );
    }
  }

  async findShiftById(id: string): Promise<Shift> {
    try {
      const shift = await this.shiftRepository.findOneBy({ id });

      if (!shift) {
        throw new BadRequestException('Смена не найдена');
      }

      return shift;
    } catch {
      throw new InternalServerErrorException('Ошибка при получении смены');
    }
  }

  async createShift(shiftData: CreateShiftDTO): Promise<Shift> {
    try {
      // Проверяем существование смены с такими же параметрами
      const shift = await this.shiftRepository.findOne({
        where: {
          date: shiftData.date,
          teamNumber: shiftData.teamNumber,
          shiftNumber: shiftData.shiftNumber,
        },
      });

      if (shift) {
        throw new ConflictException('Смена уже создана');
      }

      const shiftByShift = await this.shiftRepository.findOne({
        where: {
          date: shiftData.date,
          shiftNumber: shiftData.shiftNumber,
        },
      });

      if (shiftByShift) {
        throw new ConflictException('Дата и смена уже созданы');
      }

      const shiftByTeam = await this.shiftRepository.findOne({
        where: {
          date: shiftData.date,
          teamNumber: shiftData.teamNumber,
        },
      });

      if (shiftByTeam) {
        throw new ConflictException('Дата и бригада уже созданы');
      }

      const newShift = this.shiftRepository.create(shiftData);
      return await this.shiftRepository.save(newShift);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Перебрасываем ошибку конфликта
      }

      // Для других ошибок возвращаем внутреннюю ошибку сервера
      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  async updateShift(id: string, updateData: Partial<Shift>): Promise<Shift> {
    try {
      const shift = await this.findShiftById(id);
      Object.assign(shift, updateData);
      return await this.shiftRepository.save(shift);
    } catch {
      throw new InternalServerErrorException('Ошибка при обновлении смены');
    }
  }

  async deleteShift(id: string): Promise<void> {
    try {
      const shift = await this.findShiftById(id);

      if (!shift) {
        throw new BadRequestException('Смена не найдена');
      }

      await this.shiftRepository.delete(shift);
    } catch {
      throw new InternalServerErrorException('Ошибка при удалении смены');
    }
  }
}
