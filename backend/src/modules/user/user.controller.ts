import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { IList, IUser, ISuccess } from '../../shared/interfaces/api.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDTO): Promise<ISuccess> {
    return this.userService.createUser(dto);
  }

  @Post()
  async createUsers(@Body() dto: CreateUserDTO[]): Promise<ISuccess> {
    return this.userService.createUsers(dto);
  }

  @Get()
  async getUsers(
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IUser>> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<ISuccess> {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<ISuccess> {
    return this.userService.deleteUser(id);
  }

  /*
  @Get('team')
  async getTeamUsers(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<IUser[]> {
    try {
      const savedAccessToken = getAccessToken(req);

      const { user, accessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      setAccessToken(res, accessToken);

      return await this.userService.getTeamUsers(user.id);
    } catch {
      throw new UnauthorizedException('Требуется повторная авторизация');
    }
  }
    */
}
