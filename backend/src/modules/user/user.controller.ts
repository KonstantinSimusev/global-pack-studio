import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { IList, IUser, ISuccess } from '../../shared/interfaces/api.interface';
import {
  clearCookies,
  getAccessToken,
  setAccessToken,
} from '../../shared/utils/utils';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getUsers(): Promise<IList<IUser>> {
    return this.userService.getUsers();
  }

  @Post()
  async createUsers(@Body() users: CreateUserDTO[]): Promise<ISuccess> {
    await this.userService.createUsers(users);
    return {
      success: true,
      message: 'Пользователи успешно созданы',
    };
  }

  @Get('team')
  async getTeamUsers(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<IUser[]> {
    try {
      const savedAccessToken = getAccessToken(request);

      const { user, accessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      setAccessToken(response, accessToken);

      return await this.userService.getTeamUsers(user.id);
    } catch {
      clearCookies(response);
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDTO,
  ): Promise<IUser> {
    try {
      return await this.userService.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }
}
