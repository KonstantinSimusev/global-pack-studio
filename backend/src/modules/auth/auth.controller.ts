import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';

import { CreateLoginDTO } from './dto/create-auth.dto';
import { ISuccessResponse, IUser } from 'src/shared/interfaces/api.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() createLoginDTO: CreateLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IUser> {
    try {
      const { user, accessToken } = await this.authService.login(
        createLoginDTO.login,
        createLoginDTO.password,
      );

      // Устанавливаем Access Token в HTTP Only Cookie
      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        // maxAge: this.configService.get('ACCESS_TOKEN_EXPIRATION') * 1000,
      });

      console.log('Access token создан');

      return { ...user };
    } catch (error) {
      throw new UnauthorizedException('Ошибка авторизации');
    }
  }

  @Post('token')
  async accessToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<IUser> {
    try {
      // Получаем accessToken из cookies
      const savedAccessToken = request.cookies.access_token;

      if (!savedAccessToken) {
        console.log('Access token не найден в cookies');
        throw new UnauthorizedException('Access token не найден в cookies');
      }

      const { user, accessToken } =
        await this.authService.accessToken(savedAccessToken);

      // Обновляем access token в cookie
      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        // maxAge: this.configService.get('ACCESS_TOKEN_EXPIRATION') * 1000,
      });

      console.log('Access token обновлен в cookies');

      return { ...user };
    } catch (error) {
      // Очищаем accessToken
      this.clearCookies(response);
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<ISuccessResponse> {
    try {
      const savedAccessToken = request.cookies.access_token;

      if (!savedAccessToken) {
        throw new UnauthorizedException('Access token не найден в cookies');
      }

      await this.authService.logout(savedAccessToken);

      // Очищаем accessToken
      this.clearCookies(response);

      // Возвращаем успешный статус
      return {
        success: true,
        message: 'Успешный выход из системы',
        id: savedAccessToken.userId,
      };
    } catch (error) {
      // В любом случае очищаем токены
      this.clearCookies(response);

      throw new InternalServerErrorException(
        'Произошла ошибка при выходе из системы',
      );
    }
  }

  private clearCookies(response: Response): void {
    response.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
  }
}
