import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { UserShift } from './entities/user-shift.entity';
import { EProfession, ERole } from '../../shared/enums/enums';

@Injectable()
export class UserShiftRepository {
  constructor(
    @InjectRepository(UserShift)
    private readonly userShiftRepository: Repository<UserShift>,
  ) {}

  async create(userShift: UserShift): Promise<UserShift> {
    const newUserShift = this.userShiftRepository.create(userShift);
    return await this.userShiftRepository.save(newUserShift);
  }

  async findById(id: string): Promise<UserShift> {
    return await this.userShiftRepository.findOneBy({ id });
  }

  async update(
    userShift: UserShift,
    updateData: Partial<UserShift>,
  ): Promise<UserShift> {
    return await this.userShiftRepository.save({
      ...userShift,
      ...updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.userShiftRepository.delete(id);
  }

  async findUsersShiftsByShiftId(id: string): Promise<UserShift[]> {
    return this.userShiftRepository.find({
      where: {
        shift: { id },
        // user: {
          // profession: EProfession.MASTER,
          // sortOrder: Not(0),
        // },
      },
      order: {
        user: {
          sortOrder: 'ASC',
          lastName: 'ASC',
          firstName: 'ASC',
          patronymic: 'ASC',
        },
      },
      relations: ['user', 'shift'],
    });
  }

  async existsByUserAndShift(
    userId: string,
    shiftId: string,
  ): Promise<boolean> {
    const count = await this.userShiftRepository.count({
      where: {
        user: { id: userId },
        shift: { id: shiftId },
      },
    });

    return count > 0;
  }
}
