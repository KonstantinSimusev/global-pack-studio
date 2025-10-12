import { IsNumber, IsString, Max, Min } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../../modules/user/entities/user.entity';
import { Shift } from '../../../modules/shift/entities/shift.entity';

@Entity({
  schema: 'gps',
  name: 'user_shifts',
})
export class UserShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'attendance',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsString()
  attendance: string;

  @Column({
    name: 'hours_worked',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  @Max(20)
  hoursWorked: number;

  @Column({
    name: 'section',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @IsString()
  section: string | null;

  @Column({
    name: 'shift_profession',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  shiftProfession: string | null;

  @ManyToOne(() => User, (user) => user.shifts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.users)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;
}
