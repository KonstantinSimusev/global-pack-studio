import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { IUser } from '../../shared/interfaces/api.interface';
import { UsersService } from './users.service';

import { ApiListResponse } from '../../shared/interfaces/api.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<ApiListResponse<IUser>> {
    const users = await this.usersService.findAll();

    return {
      total: users.length,
      items: users,
    };
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
