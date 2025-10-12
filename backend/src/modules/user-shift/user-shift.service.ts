import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UserShiftRepository } from './user-shift.repository';

import { IList, IUserShift } from '../../shared/interfaces/api.interface';
import { transformUserShift } from '../../shared/utils/utils';
import { CreateUserShiftDTO } from './dto/create-user-shift.dto';

@Injectable()
export class UserShiftService {
  constructor(private readonly userShiftRepository: UserShiftRepository) {}

  async getUserShifts(): Promise<IList<IUserShift>> {
    try {
      const userShifts = await this.userShiftRepository.findUserShifts();

      // Преобразуем все сущности
      const result = userShifts.map(transformUserShift);

      return {
        total: result.length,
        items: result,
      };
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении списка пользователей',
      );
    }
  }

  /*

  async createOne(createdUser: CreateUserDTO): Promise<void> {
    try {
      // Генерируем соль и хешируем пароль
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createdUser.password, salt);

      // Создаем нового пользователя
      // Используем spread-оператор для копирования всех полей из DTO
      // Добавляем хешированный пароль в объект
      const newUser = {
        ...createdUser, // Копируем все поля из входящего DTO (login, password, profession)
        hashedPassword: hashedPassword, // Перезаписываем NULL на хешированный пароль
      };

      // Преобразуем простой объект в экземпляр сущности User
      // plainToInstance - это функция из библиотеки class-transformer
      // Она помогает преобразовать обычный объект в полноценный экземпляр класса
      // с учетом всех декораторов и валидаций из сущности TypeORM
      const user = plainToInstance(User, newUser);

      await this.userRepository.create(user);
    } catch {
      throw new BadRequestException('Некорректные данные для регистрации');
    }
  }

  async createUsers(users: CreateUserDTO[]): Promise<void> {
    try {
      if (!users || users.length === 0) {
        throw new BadRequestException(
          'Массив пользователей не может быть пустым',
        );
      }

      await Promise.all(users.map((user) => this.createOne(user)));
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при создании пользователей',
      );
    }
  }

  async getTeamUsers(userId: string): Promise<IUser[]> {
    try {
      // Получаем пользователя по ID
      const user = await this.userRepository.findOneById(userId);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      // Получаем всех пользователей команды
      const teamUsers = await this.userRepository.findTeamUsers(userId);
      const apiUsers = teamUsers.map(transform);

      return apiUsers;
    } catch {
      throw new InternalServerErrorException(
        'Произошла ошибка при получении пользователей команды',
      );
    }
  }
  */
}
