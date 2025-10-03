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

  async findOneByLogin(login: string): Promise<User | null> {
    try {
      // Ищем пользователя по логину
      const user = await this.userRepository.findOne({
        where: { login },
        // select: ['id', 'login', 'hashedPassword', 'refreshToken'],
      });

      // Если пользователь не найден, возвращаем null
      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при поиске пользователя по логину',
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

  async createMany(users: User[]): Promise<User[]> {
    try {
      // Проверка входных данных
      if (!users || users.length === 0) {
        throw new BadRequestException(
          'Массив пользователей не может быть пустым',
        );
      }

      // Проверка обязательных полей для каждого пользователя
      users.forEach((user) => {
        if (!user.login || !user.hashedPassword) {
          throw new BadRequestException(
            'Для каждого пользователя обязательны поля login и hashedPassword',
          );
        }
      });

      // Массовое сохранение
      const createdUsers = await this.userRepository.save(users);

      return createdUsers;
    } catch (error) {
      // Обработка ошибок дублирования
      if (error.code === '23505') {
        throw new ConflictException(
          'Один или несколько пользователей уже существуют в системе',
        );
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при массовом создании пользователей',
      );
    }
  }

  async patch(id: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      if (!user.login || !user.hashedPassword) {
        throw new BadRequestException(
          'Обязательны поля login и hashedPassword',
        );
      }

      // Применяем обновления напрямую к объекту
      Object.assign(user, updateData);

      // Сохраняем изменения
      const updatedUser = await this.userRepository.save(user);

      return updatedUser;
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

  async getTeamUsers(userId: string): Promise<User[]> {
    try {
      // Сначала находим пользователя по ID, чтобы получить номер его команды
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      // Теперь находим всех пользователей с таким же номером команды
      const teamUsers = await this.userRepository.find({
        where: { teamNumber: user.teamNumber },
      });

      return teamUsers;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователей команды',
      );
    }
  }
}
