import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { ShiftService } from './shift.service';
import { AuthService } from '../auth/auth.service';

import { CreateShiftDTO } from './dto/create-shift.dto';

import { IList, IShift, ISuccess } from '../../shared/interfaces/api.interface';

import {
  getAccessToken,
  setAccessToken,
  clearCookies,
} from 'src/shared/utils/utils';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getShifts(): Promise<IList<IShift>> {
    const shifts = await this.shiftService.getShifts();
    return shifts;
  }

  @Get(':id')
  async getShiftById(@Param('id', ParseUUIDPipe) id: string): Promise<IShift> {
    return await this.shiftService.getShiftById(id);
  }

  @Post()
  async createShift(
    @Body() createShiftDTO: CreateShiftDTO,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<ISuccess> {
    try {
      const savedAccessToken = getAccessToken(request);

      const { accessToken } =
        await this.authService.validateAccessToken(savedAccessToken);

      setAccessToken(response, accessToken);

      await this.shiftService.createShift(createShiftDTO);

      return {
        success: true,
        message: 'Смена успешно создана',
      };
    } catch (error) {
      console.error('Произошла ошибка:', error);
      if (error instanceof ConflictException) {
        throw error; // Перебрасываем ошибку конфликта
      }

      // Для других ошибок возвращаем внутреннюю ошибку сервера
      throw new InternalServerErrorException('Ошибка при создании смены');
    }
  }

  @Put(':id')
  async updateShift(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateShiftDTO: Partial<CreateShiftDTO>,
  ): Promise<IShift> {
    if (!id) {
      throw new BadRequestException('ID смены обязателен для обновления');
    }
    return await this.shiftService.updateShift(id, updateShiftDTO);
  }

  @Delete(':id')
  async deleteShift(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    await this.shiftService.deleteShift(id);

    return {
      success: true,
      message: 'Смена успешно удалена',
    };
  }
}
