import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiListResponse,
  ISuccessResponse,
  IUserSafeResponse,
} from '../../shared/interfaces/api.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<ApiListResponse<IUserSafeResponse>> {
    try {
      const users = await this.userRepository.findAll();

      const items = users.map((user) => ({
        id: user.id,
        login: user.login,
        refreshToken: user.refreshToken,
        refreshTokenCreatedAt: user.refreshTockenCreatedAt,
      }));

      return {
        total: items.length,
        items,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  async findOne(id: string): Promise<IUserSafeResponse> {
    try {
      const user = await this.userRepository.findOne(id);
      return {
        id: user.id,
        login: user.login,
        refreshToken: user.refreshToken,
        refreshTokenCreatedAt: user.refreshTockenCreatedAt,
      };
    } catch (error) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async create(dto: CreateUserDto): Promise<IUserSafeResponse> {
    try {
      // Генерируем соль и хешируем пароль
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      // Создаем нового пользователя
      const user = new User();

      user.login = dto.login;
      user.salt = salt;
      user.hashedPassword = hashedPassword;

      const createdUser = await this.userRepository.create(user);

      return {
        id: createdUser.id,
        login: createdUser.login,
        refreshToken: createdUser.refreshToken,
        refreshTokenCreatedAt: createdUser.refreshTockenCreatedAt,
      };
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

  async updateTokens(
    userId: string,
    tokens: {
      refreshToken: string;
      refreshTokenCreatedAt: Date;
    },
  ): Promise<ISuccessResponse> {
    try {
      const updatedUser = await this.userRepository.patch(userId, tokens);
      return {
        success: true,
        message: 'Токены успешно обновлены',
        id: updatedUser.id,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при обновлении токенов',
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
