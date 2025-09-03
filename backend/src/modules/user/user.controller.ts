import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import {
  ApiListResponse,
  ISuccessResponse,
  IUserResponse,
} from '../../shared/interfaces/api.interface';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<ApiListResponse<IUserResponse>> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUserResponse> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<IUserResponse> {
    return this.userService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ISuccessResponse> {
    return this.userService.delete(id);
  }
}
