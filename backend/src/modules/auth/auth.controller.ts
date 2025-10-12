import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { AuthService } from './auth.service';

import { CreateLoginDTO } from './dto/create-auth.dto';
import { ISuccess, IUser } from '../../shared/interfaces/api.interface';
import { clearCookies, getAccessToken, setAccessToken } from '../../shared/utils/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

      setAccessToken(response, accessToken);

      return user;
    } catch {
      throw new UnauthorizedException('Ошибка авторизации');
    }
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<ISuccess> {
    try {
      const savedAccessToken = getAccessToken(request);
      await this.authService.logout(savedAccessToken);
      clearCookies(response);

      return {
        success: true,
        message: 'Успешный выход из системы',
      };
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при выходе из системы',
      );
    }
  }

  @Post('token')
  async checkAccessToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<IUser> {
    try {
      const savedAccessToken = getAccessToken(request);

      const { user, accessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      setAccessToken(response, accessToken);

      return user;
    } catch {
      clearCookies(response);
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }
}
