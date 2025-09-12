import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiListResponse,
  ISuccessResponse,
} from '../../shared/interfaces/api.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<ApiListResponse<User>> {
    try {
      const users = await this.userRepository.findAll();

      return {
        total: users.length,
        items: users,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      // Генерируем соль и хешируем пароль
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      // Создаем нового пользователя
      // Используем spread-оператор для копирования всех полей из DTO
      // Добавляем хешированный пароль в объект
      const userData = {
        ...dto, // Копируем все поля из входящего DTO (login, password, profession)
        hashedPassword: hashedPassword, // Перезаписываем NULL на хешированный пароль
      };

      // Преобразуем простой объект в экземпляр сущности User
      // plainToInstance - это функция из библиотеки class-transformer
      // Она помогает преобразовать обычный объект в полноценный экземпляр класса
      // с учетом всех декораторов и валидаций из сущности TypeORM
      const user = plainToInstance(User, userData);

      return await this.userRepository.create(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Пользователь с таким логином уже существует',
        );
      }
      throw new BadRequestException('Некорректные данные для регистрации');
    }
  }

  async patch(
    id: string,
    updateData: Partial<User>,
  ): Promise<ISuccessResponse> {
    try {
      // Вызываем метод репозитория
      const updatedUser = await this.userRepository.patch(id, updateData);

      // Проверяем обязательные поля после обновления
      if (!updatedUser.login || !updatedUser.hashedPassword) {
        throw new BadRequestException(
          'Обязательны поля login и hashedPassword',
        );
      }

      // Возвращаем успешный ответ
      return {
        success: true,
        message: 'Пользователь успешно обновлен',
        id: updatedUser.id,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Пользователь с таким логином уже существует',
        );
      }

      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении пользователя',
      );
    }
  }

  async delete(id: string): Promise<ISuccessResponse> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      await this.userRepository.delete(id);
      return {
        success: true,
        message: 'Пользователь успешно удален',
        id: user.id,
      };
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException('Пользователь связан с другими записями');
      }
      throw new InternalServerErrorException(
        'Произошла ошибка при удалении пользователя',
      );
    }
  }
}
