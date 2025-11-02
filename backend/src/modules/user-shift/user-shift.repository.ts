import { Repository } from 'typeorm';
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
    return await this.userShiftRepository
      .createQueryBuilder('userShift')
      .leftJoinAndSelect('userShift.user', 'user')
      .leftJoinAndSelect('userShift.shift', 'shift')
      .where('userShift.shift.id = :id', { id })
      .andWhere('user.profession != :profession', {
        profession: EProfession.MASTER,
      })
      .andWhere('user.sortOrder != :sortOrder', { sortOrder: 0 })
      .addOrderBy('user.sortOrder', 'ASC')
      .addOrderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC')
      .addOrderBy('user.patronymic', 'ASC')
      .getMany();
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
