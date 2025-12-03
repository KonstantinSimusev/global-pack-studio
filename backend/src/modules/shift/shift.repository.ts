import { Repository, LessThanOrEqual, MoreThan, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { Shift } from './entities/shift.entity';

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

  async findAll(): Promise<Shift[]> {
    return this.shiftRepository.find({});
  }

  async findById(id: string): Promise<Shift> {
    return this.shiftRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    this.shiftRepository.delete(id);
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

  async findActiveShift(): Promise<Shift> {
    const nowUTC = new Date();
    nowUTC.setMinutes(nowUTC.getMinutes() - nowUTC.getTimezoneOffset());

    return this.shiftRepository.findOne({
      where: {
        startShift: LessThanOrEqual(nowUTC), // startShift <= now
        endShift: MoreThan(nowUTC), // endShift > now
      },
      order: {
        date: 'DESC',
        shiftNumber: 'DESC',
      },
      relations: ['usersShifts', 'usersShifts.user', 'productions'],

      select: {
        // Поля Shift
        id: true,
        date: true,
        shiftNumber: true,
        teamNumber: true,
        startShift: true,
        endShift: true,

        // Поля UserShift
        usersShifts: {
          id: true,
          workStatus: true,
          workPlace: true,
          shiftProfession: true,
          workHours: true,

          // Поля User (вложенные)
          user: {
            id: true,
            positionCode: true,
            lastName: true,
            firstName: true,
            patronymic: true,
            profession: true,
            grade: true,
            personalNumber: true,
            teamNumber: true,
            currentTeamNumber: true,
            workSchedule: true,
            workshopCode: true,
            role: true,
            sortOrder: true,
            // hashedPassword не указываем → не загружаем
          },
        },
      },
    });
  }

  async findFinishedShift(): Promise<Shift> {
    const nowUTC = new Date();
    nowUTC.setMinutes(nowUTC.getMinutes() - nowUTC.getTimezoneOffset());

    return this.shiftRepository.findOne({
      where: {
        endShift: LessThan(nowUTC), // endShift < nowUTC (смена уже закончилась)
      },
      order: {
        date: 'DESC', // сначала самые свежие даты
        shiftNumber: 'DESC', // затем самый большой номер смены
      },
      relations: ['usersShifts', 'usersShifts.user', 'productions'],

      select: {
        // Поля Shift
        id: true,
        date: true,
        shiftNumber: true,
        teamNumber: true,
        startShift: true,
        endShift: true,

        // Поля UserShift
        usersShifts: {
          id: true,
          workStatus: true,
          workPlace: true,
          shiftProfession: true,
          workHours: true,

          // Поля User (вложенные)
          user: {
            id: true,
            positionCode: true,
            lastName: true,
            firstName: true,
            patronymic: true,
            profession: true,
            grade: true,
            personalNumber: true,
            teamNumber: true,
            currentTeamNumber: true,
            workSchedule: true,
            workshopCode: true,
            role: true,
            sortOrder: true,
            // hashedPassword не указываем → не загружаем
          },
        },
      },
    });
  }

  async findLastTeamShift(teamNumber: number): Promise<Shift[]> {
    return this.shiftRepository.find({
      where: {
        teamNumber,
      },
      order: {
        date: 'DESC',
      },
      take: 1, // нам нужна только последняя смена
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
  */
}
