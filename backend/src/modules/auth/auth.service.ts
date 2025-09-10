import * as bcrypt from 'bcrypt';

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../user/user.repository';
import { ILogin } from '../../shared/interfaces/api.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(login: string, password: string): Promise<ILogin> {
    try {
      // Поиск пользователя
      const user = await this.userRepository.findOneByLogin(login);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Неверный пароль');
      }

      // Генерируем accessToken
      const accessToken = await this.jwtService.signAsync(
        { userId: user.id, login: user.login },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: parseInt(
            this.configService.get('ACCESS_TOKEN_EXPIRATION'),
            10,
          ),
        },
      );

      // Генерируем refreshToken
      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: parseInt(
            this.configService.get('REFRESH_TOKEN_EXPIRATION'),
            10,
          ),
        },
      );

      // Обновили refreshToken в базе данных
      await this.userRepository.patch(user.id, {
        refreshToken,
      });

      return {
        user: user,
        accessToken,
      };
    } catch (error) {
      console.log('Ошибка авторизации');
      throw new UnauthorizedException('Ошибка авторизации');
    }
  }

  async accessToken(savedAccessToken: string): Promise<ILogin> {
    let userId: string | null = null;

    try {
      const accessDecoded = this.jwtService.verify(savedAccessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      userId = accessDecoded.userId;

      if (!accessDecoded || !userId) {
        throw new UnauthorizedException('Access token не валидный');
      }

      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      // Генерируем новый access token
      const newAccessToken = await this.jwtService.signAsync(
        { userId: user.id, login: user.login },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: parseInt(
            this.configService.get('ACCESS_TOKEN_EXPIRATION'),
            10,
          ),
        },
      );

      console.log('Новый access token создан в accessToken()');

      return {
        user: user,
        accessToken: newAccessToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('Access token просрочен, нужно обновить');

        // Логика обновления

        try {
          // Получаем refreshToken из базы данных
          console.log('Получаем refreshToken из базы данных');
          const user = await this.userRepository.findOne(userId);
          const dbRefreshToken = user.refreshToken;

          if (!dbRefreshToken) {
            throw new UnauthorizedException('Refresh token отсутствует');
          }

          // Проверяем срок жизни refreshToken
          console.log('Проверяем срок жизни refreshToken');
          const refreshDecoded = this.jwtService.verify(dbRefreshToken, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          });

          if (!refreshDecoded) {
            console.log('Refresh token просрочен');
            throw new Error('Refresh token просрочен');
          }

          /*

          // Генерируем новый refresh token
          const newRefreshToken = await this.jwtService.signAsync(
            { userId: user.id },
            {
              secret: this.configService.get('REFRESH_TOKEN_SECRET'),
              expiresIn: parseInt(
                this.configService.get('REFRESH_TOKEN_EXPIRATION'),
                10,
              ),
            },
          );

          // Обновляем токен в базе
          await this.userRepository.patch(user.id, {
            refreshToken: newRefreshToken,
          });

          */

          // Генерируем новый access token
          console.log('Генерируем новый access token');
          const newAccessToken = await this.jwtService.signAsync(
            { userId: user.id, login: user.login },
            {
              secret: this.configService.get('ACCESS_TOKEN_SECRET'),
              expiresIn: parseInt(
                this.configService.get('ACCESS_TOKEN_EXPIRATION'),
                10,
              ),
            },
          );

          console.log('Новый access token создан в сервисе');

          return {
            user: user,
            accessToken: newAccessToken,
          };
        } catch {
          console.log('Удаляем refresh token из базы');
          await this.userRepository.patch(userId, {
            refreshToken: null,
          });
          console.log('Требуется повторная авторизация');
          throw new UnauthorizedException('Требуется повторная авторизация');
        }
      }
      console.log('Требуется повторная авторизация');
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  async logout(accessToken: any): Promise<void> {
    try {
      const user = await this.userRepository.findOne(accessToken.userId);

      // Если пользователь не найден - бросаем ошибку
      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      await this.userRepository.patch(accessToken.userId, {
        refreshToken: null,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при обновлении данных пользователя',
      );
    }
  }
}
