import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../modules/user/entities/user.entity';
import { IUser, IUserShift } from '../interfaces/api.interface';
import { UserShift } from '../../modules/user-shift/entities/user-shift.entity';
import { AuthService } from 'src/modules/auth/auth.service';

export function transformUser(user: User): IUser {
  const { login, hashedPassword, refreshToken, ...publicUser } = user;
  return publicUser;
}

export function transformUserShift(userShift: UserShift): IUserShift {
  // Деструктурируем объект, исключая ненужные поля
  const { user, shift, ...publicUserShift } = userShift;

  return {
    ...publicUserShift,
    userId: user.id,
    shiftId: shift.id,
  };
}

export function getAccessToken(request: Request): string {
  const savedAccessToken = request.cookies.access_token;

  if (!savedAccessToken) {
    throw new UnauthorizedException('Access token не найден в cookies');
  }

  return savedAccessToken;
}

export function setAccessToken(response: Response, accessToken: string) {
  response.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
}

export function clearCookies(response: Response): void {
  response.cookie('access_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
}
