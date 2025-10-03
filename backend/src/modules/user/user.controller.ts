import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express'; // Импортируем Response из express

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

import { ISuccessResponse } from '../../shared/interfaces/api.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.userService.findAll();

    // Устанавливаем правильный Content-Type
    response.set('Content-Type', 'application/json');

    // Отправляем отформатированный JSON с отступами в 2 пробела
    response.send(JSON.stringify(result, null, 2));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('bulk')
  async createMany(@Body() dtos: CreateUserDto[]) {
    return this.userService.createMany(dtos);
  }

  /*
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<ISuccessResponse> {
    const updatedUser = await this.userService.patch(id, updateData);
    return {
      success: true,
      message: 'Пользователь успешно обновлен',
      id: updatedUser.id,
    };
  }
  */

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ISuccessResponse> {
    return this.userService.delete(id);
  }
}
