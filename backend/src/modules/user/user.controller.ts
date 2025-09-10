import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ISuccessResponse } from '../../shared/interfaces/api.interface';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateData: UpdateUserDto,
  // ): Promise<ISuccessResponse> {
  //   const updatedUser = await this.userService.patch(id, updateData);
  //   return {
  //     success: true,
  //     message: 'Пользователь успешно обновлен',
  //     id: updatedUser.id,
  //   };
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ISuccessResponse> {
    return this.userService.delete(id);
  }
}
