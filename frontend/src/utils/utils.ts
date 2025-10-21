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

// Функция для форматирования даты
export const formatDate = (date: Date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const delay = (ms: number = 1000): Promise<void> =>
  new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, ms);
  });
