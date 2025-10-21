import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { Shift } from './entities/shift.entity';
import { CreateShiftDTO } from './dto/create-shift.dto';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  // CRUD
  async create(shiftData: CreateShiftDTO): Promise<Shift> {
    const newShift = this.shiftRepository.create(shiftData);
    return await this.shiftRepository.save(newShift);
  }

  async findAll(): Promise<Shift[]> {
    return await this.shiftRepository.find({});
  }

  async findById(id: string): Promise<Shift> {
    return await this.shiftRepository.findOneBy({ id });
  }

  async update(shift: Shift, updateData: Partial<Shift>): Promise<Shift> {
    return await this.shiftRepository.save({
      ...shift,
      ...updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.shiftRepository.delete(id);
  }

  // Специфические методы поиска
  async findShift(shiftData: CreateShiftDTO): Promise<Shift> {
    return await this.shiftRepository.findOne({
      where: {
        date: shiftData.date,
        teamNumber: shiftData.teamNumber,
        shiftNumber: shiftData.shiftNumber,
      },
    });
  }

  async findTeamShifts(
    teamNumber: number,
    startOfMonth: Date,
    endOfMonth: Date,
  ): Promise<Shift[]> {
    return await this.shiftRepository.find({
      where: {
        teamNumber,
        date: Between(startOfMonth, endOfMonth),
      },
      order: {
        date: 'DESC',
      },
    });
  }
}
