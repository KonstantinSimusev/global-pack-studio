import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  Length,
} from 'class-validator';

export class CreateLoginDTO {
  @IsString({ message: 'Логин должен быть строкой' })
  @IsNotEmpty({ message: 'Логин не может быть пустым' })
  @MinLength(8, { message: 'Логин должен содержать минимум 8 символов' })
  login: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string;
}

export class CreateRefreshTokenDTO {
  @IsString()
  @IsNotEmpty({ message: 'Токен не может быть пустым' })
  @Length(10, 500, {
    message: 'Длина токена должна быть от 10 до 500 символов',
  })
  refreshToken: string;
}

export class CreateLogoutDTO {
  @IsString({ message: 'Идентификатор пользователя должен быть строкой' })
  userId: string;
}
