import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { IList, IUser, ISuccess } from '../../shared/interfaces/api.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDTO): Promise<ISuccess> {
    return this.userService.createUser(dto);
  }

  @Post('all')
  async createUsers(@Body() dto: CreateUserDTO[]): Promise<ISuccess> {
    return this.userService.createUsers(dto);
  }

  @Get()
  async getUsers(): Promise<IList<IUser>> {
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
}
