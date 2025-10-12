import { Controller, Get } from '@nestjs/common';

import { IList, IUserShift } from '../../shared/interfaces/api.interface';

import { UserShiftService } from './user-shift.service';

@Controller('user-shifts')
export class UserShiftController {
  constructor(private readonly userShiftService: UserShiftService) {}

  @Get()
  async getUserShifts(): Promise<IList<IUserShift>> {
    const shifts = await this.userShiftService.getUserShifts();
    return shifts;
  }
}
