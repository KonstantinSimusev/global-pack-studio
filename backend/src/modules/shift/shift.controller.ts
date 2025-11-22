import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { ShiftService } from './shift.service';

import { CreateShiftDTO } from './dto/create-shift.dto';

import {
  IList,
  IProduction,
  IShift,
  ISuccess,
  IUserShift,
} from '../../shared/interfaces/api.interface';
import { DeleteShiftDTO } from './dto/delete-shift.dto';
import { ProductionService } from '../production/production.service';
import { UserShiftService } from '../user-shift/user-shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly userShiftService: UserShiftService,
    private readonly productionService: ProductionService,
  ) {}

  @Post('create-shift')
  async createShift(
    @Body() dto: CreateShiftDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    return this.shiftService.createShift(dto, req, res);
  }

  @Get('last-team-shift')
  async getLastTeamShift(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IShift> {
    return this.shiftService.getLastTeamShift(req, res);
  }

  @Get(':shiftId/users-shifts')
  async getUsersShifts(
    @Param('shiftId', ParseUUIDPipe) shiftId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IUserShift>> {
    return this.userShiftService.getUsersShifts(shiftId, req, res);
  }

  @Get(':shiftId/productions')
  async getProductions(
    @Param('shiftId', ParseUUIDPipe) shiftId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IList<IProduction>> {
    return this.productionService.getProductions(shiftId, req, res);
  }

  // @Get('team-shifts')
  // async getTeamShifts(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<IList<IShift>> {
  //   return this.shiftService.getTeamShifts(req, res);
  // }

  // @Get(':id')
  // async getUsersShifts(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<IList<IUserShift>> {
  //   return this.userShiftService.getUsersShifts(id, req, res);
  // }

  // @Delete('delete')
  // async deleteShift(
  //   @Body() dto: DeleteShiftDTO,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<ISuccess> {
  //   return this.shiftService.deleteShift(dto.id, req, res);
  // }

  /*
  @Get('all')
  async getShifts(): Promise<IList<IShift>> {
    return await this.shiftService.getShifts();
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
  */
}
