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

  async create(shift: Shift): Promise<Shift> {
    const newShift = this.shiftRepository.create(shift);
    return this.shiftRepository.save(newShift);
  }

  async findById(id: string): Promise<Shift> {
    return this.shiftRepository.findOneBy({ id });
  }

  async findOne(shift: Shift): Promise<Shift> {
    return this.shiftRepository.findOne({
      where: {
        date: shift.date,
        teamNumber: shift.teamNumber,
        shiftNumber: shift.shiftNumber,
      },
    });
  }

  async findLastShift(teamNumber: number): Promise<Shift[]> {
    return this.shiftRepository.find({
      where: {
        teamNumber,
      },
      order: {
        date: 'DESC',
      },
      take: 1,  // нам нужна только последняя смена
    });
  }

  async findTeamShifts(
    teamNumber: number,
    startOfMonth: Date,
    endOfMonth: Date,
  ): Promise<Shift[]> {
    return this.shiftRepository.find({
      where: {
        teamNumber,
        date: Between(startOfMonth, endOfMonth),
      },
      order: {
        date: 'DESC',
      },
    });
  }

  /*
  async findAll(): Promise<Shift[]> {
    return this.shiftRepository.find({});
  }

  async update(shift: Shift, updateData: Partial<Shift>): Promise<Shift> {
    return this.shiftRepository.save({
      ...shift,
      ...updateData,
    });
  }

  async delete(id: string): Promise<void> {
    this.shiftRepository.delete(id);
  }
  */
}
