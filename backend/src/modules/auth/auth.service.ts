import * as bcrypt from 'bcrypt';

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../user/user.repository';
import { IUserResponse } from 'src/shared/interfaces/api.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(login: string, password: string): Promise<IUserResponse> {
    try {
      // Поиск пользователя
      const user = await this.userRepository.findOneByLogin(login);

      if (!user) {
        throw new Error();
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (!isPasswordValid) {
        throw new Error();
      }

      // // Создание access token
      // const accessToken = await this.jwtService.signAsync(
      //   { userId: user.id, login: user.login },
      //   {
      //     secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      //     expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
      //   },
      // );

      // // Создание refresh token
      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
        },
      );

      // // Обновление refresh token в базе
      await this.userRepository.patch(user.id, {
        refreshToken,
        refreshTokenCreatedAt: new Date(),
      });

      return {
        // accessToken,
        id: user.id,
        login: user.login,
        refreshToken: refreshToken,
        refreshTokenCreatedAt: new Date(),
      };
    } catch (error) {
      throw new Error();
    }
  }

  async refreshToken(refreshToken: string): Promise<IUserResponse> {
    try {
      // Проверяем подпись и срок жизни токена
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      // Находим пользователя по ID из токена
      const user = await this.userRepository.findOne(decoded.userId);

      if (!user) {
        throw new Error();
      }

      // Генерируем новый refresh token
      const newRefreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
        },
      );

      // Обновляем токен в базе
      await this.userRepository.patch(user.id, {
        refreshToken: newRefreshToken,
        refreshTokenCreatedAt: new Date(),
      });

      return {
        id: user.id,
        login: user.login,
        refreshToken: newRefreshToken,
        refreshTokenCreatedAt: new Date(),
      };
    } catch (error) {
      throw new Error();
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      await this.userRepository.patch(userId, {
        refreshToken: null,
        refreshTokenCreatedAt: null,
      });
    } catch (error) {
      throw new Error();
    }
  }
}
