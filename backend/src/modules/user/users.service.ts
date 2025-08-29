import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { IUser } from '../../shared/interfaces/api.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<IUser[]> {
    return this.usersRepository.findAll();
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const createdUser = await this.usersRepository.create({
      login: dto.login,
      salt,
      hashedPassword,
    });

    return { id: createdUser.id, login: createdUser.login };
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
