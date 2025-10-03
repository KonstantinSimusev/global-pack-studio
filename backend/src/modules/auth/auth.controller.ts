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
import { ISuccessResponse, IUser } from 'src/shared/interfaces/api.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() createLoginDTO: CreateLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IUser> {
    try {
      const { updateUser, accessToken } = await this.authService.login(
        createLoginDTO.login,
        createLoginDTO.password,
      );

      this.setAccessToken(response, accessToken);

      return { ...updateUser };
    } catch {
      throw new UnauthorizedException('Ошибка авторизации');
    }
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<ISuccessResponse> {
    try {
      const savedAccessToken = this.getAccessToken(request);
      await this.authService.logout(savedAccessToken);
      this.clearCookies(response);

      return {
        success: true,
        message: 'Успешный выход из системы',
      };
    } catch {
      this.clearCookies(response);

      throw new InternalServerErrorException(
        'Произошла ошибка при выходе из системы',
      );
    }
  }

  @Post('token')
  async checkAccessToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    try {
      const savedAccessToken = this.getAccessToken(request);

      const { user, newAccessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      this.setAccessToken(response, newAccessToken);

      return { ...user };
    } catch {
      this.clearCookies(response);
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  @Get('team')
  async getTeamUsers(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    try {
      const savedAccessToken = this.getAccessToken(request);

      const { user, newAccessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      this.setAccessToken(response, newAccessToken);

      // Получаем пользователей команды
      return await this.authService.getTeamUsers(user.id);
    } catch {
      this.clearCookies(response);
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  private getAccessToken(request: Request): string {
    const savedAccessToken = request.cookies.access_token;

    if (!savedAccessToken) {
      throw new UnauthorizedException('Access token не найден в cookies');
    }

    return savedAccessToken;
  }

  private setAccessToken(response: Response, accessToken: string) {
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
  }

  private clearCookies(response: Response): void {
    response.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
  }
}
