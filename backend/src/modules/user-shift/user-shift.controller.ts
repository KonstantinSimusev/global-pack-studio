import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { UserShiftService } from './user-shift.service';
import { ISuccess } from 'src/shared/interfaces/api.interface';
import { RequestDTO } from './dto/request.dto';

@Controller('users-shifts')
export class UserShiftController {
  constructor(private readonly userShiftService: UserShiftService) {}

  @Post('create-shift')
  async createUserShift(
    @Body() dto: RequestDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ISuccess> {
    return this.userShiftService.creatUserShift(dto, req, res);
  }

  // @Get(':id')
  // async get(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<IList<IProfession>> {
  //   return this.userShiftService.get(id, req, res);
  // }
}
