import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { IWorker } from '../../shared/interfaces/api.interface';
import { Profession } from '../../shared/enums/enums';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
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

  async findTeamUsers(id: string): Promise<User[]> {
    try {
      // Сначала находим пользователя по ID, чтобы получить номер его команды
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      // Теперь находим всех пользователей с таким же номером команды
      const teamUsers = await this.userRepository.find({
        where: { teamNumber: user.teamNumber },
      });

      return teamUsers;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователей команды',
      );
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      return user;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователя',
      );
    }
  }

  async findOneByLogin(login: string): Promise<User> {
    try {
      // Ищем пользователя по логину
      const user = await this.userRepository.findOne({
        where: { login },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      return user;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при поиске пользователя по логину',
      );
    }
  }

  async findOneByPersonalNumber(personalNumber: number): Promise<User> {
    try {
      // Ищем пользователя по логину
      const user = await this.userRepository.findOne({
        where: { personalNumber },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      return user;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при поиске пользователя по логину',
      );
    }
  }

  async create(user: User): Promise<void> {
    try {
      if (!user.login || !user.hashedPassword) {
        throw new BadRequestException(
          'Обязательны поля login и hashedPassword',
        );
      }

      await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при создании пользователя',
      );
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      if (!user.login) {
        throw new BadRequestException(
          'Обязательны поля login',
        );
      }

      // Применяем обновления напрямую к объекту
      Object.assign(user, updateData);

      // Сохраняем изменения
      await this.userRepository.save(user);

      return user;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении пользователя',
      );
    }
  }

  async findWorkers(): Promise<IWorker[]> {
    const workers = await this.userRepository
      .createQueryBuilder('user')
      .select('user.profession', 'name')
      .addSelect('user.team_number', 'teamNumber')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('user.profession, user.team_number')
      .where('user.profession NOT IN (:manager, :master, :chief)', {
        manager: Profession.MANAGER,
        master: Profession.MASTER,
        chief: Profession.CHIEF,
      })
      .orderBy('user.profession', 'ASC') // Сначала сортировка по профессии
      .addOrderBy('user.team_number', 'ASC') // Затем по номеру команды
      .getRawMany();

    return workers;
  }
}
