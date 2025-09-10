import type { IUser } from './api.interface';

export const getRedirectPath = (user: IUser): string => {
  if (!user) return '/';

  // Проверяем профессию и возвращаем соответствующий маршрут
  switch (user.profession) {
    case 'master':
      return '/timesheet';

    default:
      return '/home';
  }
};
