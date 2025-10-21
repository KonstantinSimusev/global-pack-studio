import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import { User } from '../../../modules/user/entities/user.entity';
import { Shift } from '../../../modules/shift/entities/shift.entity';

@Entity({
  schema: 'gps',
  name: 'user_shifts',
})
export class UserShift {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({
    name: 'work_status',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsString()
  workStatus: string;

  @Column({
    name: 'work_place',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsString()
  workPlace: string;

  @Column({
    name: 'shift_profession',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  shiftProfession: string;

  @Column({
    name: 'work_hours',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  @Max(20)
  workHours: number;

  @ManyToMany(() => User, (user) => user.userShifts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Shift, (shift) => shift.userShifts)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;
}
