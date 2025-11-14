import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { UserShiftService } from './user-shift.service';
import { ISuccess, IUserShift } from 'src/shared/interfaces/api.interface';
import { RequestDTO } from './dto/user-request.dto';
import { DeleteUserShiftDTO } from './dto/delete-user-shift.dto';
import { UpdateUserShiftDTO } from './dto/update-user-shift.dto';

@Controller('users-shifts')
export class UserShiftController {
  constructor(private readonly userShiftService: UserShiftService) {}

  @Post('create')
  async createUserShift(
    @Body() dto: RequestDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IUserShift> {
    return this.userShiftService.creatUserShift(dto, req, res);
  }

  // @Get(':id')
  // async getUserShiftById(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<IUserShift> {
  //   return this.userShiftService.getUserShiftById(id, req, res);
  // }

  @Put('update')
  async updateUserShift(
    @Body() dto: UpdateUserShiftDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    return this.userShiftService.updateUserShift(dto, req, res);
  }

  @Delete('delete')
  async deleteUserShift(
    @Body() dto: DeleteUserShiftDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    return this.userShiftService.deleteUserShift(dto.id, req, res);
  }
}
