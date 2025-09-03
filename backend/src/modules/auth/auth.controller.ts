import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ISuccessResponse,
  IUserResponse,
} from 'src/shared/interfaces/api.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { login, password },
    @Res() response,
  ): Promise<IUserResponse> {
    try {
      return await this.authService.login(login, password);
    } catch (error) {
      throw new Error();
    }
  }

  // @Post('login')
  // async login(@Body() { login, password }, @Res() response) {
  //   const { accessToken, refreshToken } = await this.authService.login(
  //     login,
  //     password,
  //   );

  // Устанавливаем Access Token в HTTP Only Cookie
  // response.cookie('access_token', accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  //   maxAge: 15 * 60 * 1000,
  // });

  // Возвращаем Refresh Token в теле ответа
  //   return {
  //     refreshToken,
  //   };
  // }

  @Post('token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<IUserResponse> {
    try {
      // Вызываем сервис для обработки
      const result = await this.authService.refreshToken(refreshToken);
      return result;
    } catch (error) {
      throw new Error();
    }
  }

  @Post('logout')
  async logout(
    @Body('userId') userId: string,
    @Res() response,
  ): Promise<ISuccessResponse> {
    try {
      await this.authService.logout(userId);
      const result: ISuccessResponse = {
        success: true,
        message: 'Выход из системы выполнен',
        id: userId,
      };
      return response.json(result);
    } catch (error) {
      throw new Error();
    }
  }
}
