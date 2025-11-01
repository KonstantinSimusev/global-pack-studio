import { IsDate, IsNumber, IsPositive, Max, Min } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';

import { UserShift } from '../../../modules/user-shift/entities/user-shift.entity';

@Entity({
  schema: 'gps',
  name: 'shifts',
})
@Unique(['date', 'shiftNumber'])
@Unique(['date', 'teamNumber'])
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'date',
    type: 'date',
    nullable: false,
  })
  @IsDate()
  date: Date;

  @Column({
    name: 'shift_number',
    type: 'integer',
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(2)
  shiftNumber: number;

  @Column({
    name: 'team_number',
    type: 'integer',
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(5)
  teamNumber: number;

  @OneToMany(() => UserShift, (userShift) => userShift.shift)
  usersShifts: UserShift[];
}
