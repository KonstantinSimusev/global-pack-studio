import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { error } from 'console';
import { ISuccessResponse } from 'src/shared/interfaces/api.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей (Ошибка получения данных)',
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        // Можно добавить relations для загрузки связанных сущностей
        // relations: ['roles', 'posts'],
        // Можно добавить select для выбора определенных полей
        // select: ['id', 'name', 'email']
      });

      if (!user) {
        throw new NotFoundException(
          'Пользователь не найден (ID не существует)',
        );
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователя (Ошибка доступа к данным)',
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      // Проверка обязательных полей
      if (!user.login || !user.hashedPassword) {
        throw new BadRequestException(
          'Обязательны поля login и hashedPassword (Недостаточно данных для создания)',
        );
      }
      return await this.userRepository.save(user);
    } catch (error) {
      // Обрабатываем специфические ошибки
      if (error.code === '23505') {
        // Дубликат записи
        throw new ConflictException(
          'Пользователь с таким логином уже существует',
        );
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при создании пользователя',
      );
    }
  }

  async patch(id: string, updateData: Partial<User>): Promise<User> {
    try {
      // Проверяем существование пользователя
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(
          'Пользователь не найден (ID не существует)',
        );
      }

      // Обновляем данные
      Object.assign(user, updateData);

      // Проверка обязательных полей после обновления
      if (!user.login || !user.hashedPassword) {
        throw new BadRequestException(
          'Обязательны поля login и hashedPassword (Недостаточно данных для обновления)',
        );
      }

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Пользователь с таким логином уже существует (Дублирование данных)',
        );
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении пользователя (Ошибка сохранения данных)',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // Сначала проверяем существование пользователя
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(
          'Пользователь не найден (ID не существует)',
        );
      }

      // Удаляем пользователя
      const result = await this.userRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(
          'Пользователь не найден (Не удалось удалить запись)',
        );
      }
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException(
          'Пользователь связан с другими записями (Нарушение целостности данных)',
        );
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при удалении пользователя (Ошибка операции удаления)',
      );
    }
  }
}
