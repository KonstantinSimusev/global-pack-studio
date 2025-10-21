import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { ShiftService } from './shift.service';

import { CreateShiftDTO } from './dto/create-shift.dto';
import { DeleteDTO } from './dto/delete-shift.dto';

import { IList, IShift, ISuccess } from '../../shared/interfaces/api.interface';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  async createShift(
    @Body() dto: CreateShiftDTO,
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<IShift> {
    return await this.shiftService.createShift(dto);
  }

  @Get('team-shifts')
  async getTeamShifts(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IShift>> {
    return await this.shiftService.getTeamShifts(req, res);
  }

  @Get('all')
  async getShifts(): Promise<IList<IShift>> {
    return await this.shiftService.getShifts();
  }

  @Delete('delete')
  async deleteShift(@Body() dto: DeleteDTO): Promise<ISuccess> {
    return await this.shiftService.deleteShift(dto.id);
  }

  @Get(':id')
  async getShiftById(@Param('id', ParseUUIDPipe) id: string): Promise<IShift> {
    return await this.shiftService.getShiftById(id);
  }

  @Put(':id')
  async updateShift(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateShiftDTO: Partial<CreateShiftDTO>,
  ): Promise<IShift> {
    return await this.shiftService.updateShift(id, updateShiftDTO);
  }
}
