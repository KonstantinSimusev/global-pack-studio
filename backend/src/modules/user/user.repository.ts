import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CRUD
  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(user: User, updateData: Partial<User>): Promise<User> {
    return await this.userRepository.save({
      ...user,
      ...updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Специфические методы поиска
  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async findUsersByTeam(teamNumber: number): Promise<User[]> {
    const teamUsers = await this.userRepository.find({
      where: {
        teamNumber,
        profession: Not('мастер участка'),
      },
    });

    return teamUsers;
  }

  // async findWorkers(): Promise<IWorker[]> {
  //   const workers = await this.userRepository
  //     .createQueryBuilder('user')
  //     .select('user.profession', 'name')
  //     .addSelect('user.team_number', 'teamNumber')
  //     .addSelect('COUNT(user.id)', 'count')
  //     .groupBy('user.profession, user.team_number')
  //     .where('user.profession NOT IN (:manager, :master, :chief)', {
  //       manager: Profession.MANAGER,
  //       master: Profession.MASTER,
  //       chief: Profession.CHIEF,
  //     })
  //     .orderBy('user.profession', 'ASC') // Сначала сортировка по профессии
  //     .addOrderBy('user.team_number', 'ASC') // Затем по номеру команды
  //     .getRawMany();

  //   return workers;
  // }
}
