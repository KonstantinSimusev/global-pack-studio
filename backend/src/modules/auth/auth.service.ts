import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../user/user.repository';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(login: string, password: string) {
    try {
      // Поиск пользователя
      const user = await this.userRepository.findOneByLogin(login);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Неверный пароль');
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
      const updateUser = await this.userRepository.patch(user.id, {
        refreshToken,
      });

      console.log(
        'Этот блок сработал при правильном входе, accessToken создан и refreshToken обновлен',
      );

      return {
        updateUser,
        accessToken,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException(
        'Произошла ошибка при авторизации',
      );
    }
  }

  async logout(savedAccessToken: string): Promise<void> {
    try {
      // Проверяем, что токен не пустой
      if (!savedAccessToken) {
        throw new UnauthorizedException('Токен отсутствует');
      }

      // Декодируем токен без проверки срока действия
      const decoded = this.jwtService.decode(savedAccessToken);

      // Проверяем результат декодирования
      if (!decoded) {
        throw new UnauthorizedException('Ошибка декодирования токена');
      }

      const userId = decoded.userId;

      if (!userId) {
        throw new UnauthorizedException('В токене отсутствует поле userId');
      }

      // Находим пользователя в базе
      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      await this.userRepository.patch(user.id, {
        refreshToken: null,
      });
    } catch {
      throw new InternalServerErrorException(
        'Ошибка при обновлении данных пользователя',
      );
    }
  }

  async validateAccessToken(
    savedAccessToken: string,
  ): Promise<{ user: User; newAccessToken: string }> {
    let userId: string | undefined;

    try {
      // Проверяем, что токен не пустой
      if (!savedAccessToken) {
        throw new UnauthorizedException('Токен отсутствует');
      }

      // Декодируем токен без проверки срока действия
      const decoded = this.jwtService.decode(savedAccessToken);

      // Проверяем результат декодирования
      if (!decoded) {
        throw new UnauthorizedException('Ошибка декодирования токена');
      }

      userId = decoded.userId;

      if (!userId) {
        throw new UnauthorizedException('В токене отсутствует поле userId');
      }

      // Находим пользователя в базе
      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      // Проверяем валидность токена с учетом срока действия
      const accessDecoded = this.jwtService.verify(savedAccessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      if (!accessDecoded) {
        throw new UnauthorizedException('Access token истек');
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

      return {
        user,
        newAccessToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Находим пользователя в базе
        const user = await this.userRepository.findOne(userId);

        if (!user) {
          throw new UnauthorizedException('Пользователь не найден');
        }

        const dbRefreshToken = user.refreshToken;

        if (!dbRefreshToken) {
          throw new UnauthorizedException('Refresh token не найден');
        }

        try {
          // Проверяем срок жизни refreshToken
          const refreshDecoded = this.jwtService.verify(dbRefreshToken, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          });

          if (!refreshDecoded) {
            throw new UnauthorizedException('Refresh token просрочен');
          }
        } catch {
          await this.userRepository.patch(user.id, {
            refreshToken: null,
          });

          throw new UnauthorizedException('Refresh token просрочен');
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

        return {
          user,
          newAccessToken,
        };
      }

      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  async getTeamUsers(userId: string): Promise<User[]> {
    try {
      // Получаем пользователя по ID
      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      // Получаем всех пользователей команды
      const teamUsers = await this.userRepository.getTeamUsers(userId);

      return teamUsers;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователей команды'
      );
    }
  }
}
