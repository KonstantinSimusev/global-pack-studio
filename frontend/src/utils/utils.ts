import type { IUserShift } from './api.interface';
import type { TProfession } from './types';

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

export function getProfessionsWithCounts(
  userShifts: IUserShift[],
): { profession: TProfession; count: number }[] {
  // Инициализируем счётчик для всех возможных профессий со значением 0
  const counts: Record<TProfession, number> = {
    'Укладчик-упаковщик': 0,
    'Штабелировщик металла': 0,
    'Оператор ПУ': 0,
    'Укладчик-упаковщик ЛУМ': 0,
    'Бригадир ОСП': 0,
    'Водитель погрузчика': 0,
    'Резчик холодного металла': 0,
  };

  // Проходим по данным и обновляем счётчики для подходящих записей
  for (const userShift of [...userShifts]) {
    if (userShift.workPlace === 'Не выбрано') {
      continue; // пропускаем записи для 'Не определен'
    }

    const profession = userShift.shiftProfession as TProfession;

    // Увеличиваем счётчик, только если профессия входит в TProfession
    if (profession in counts) {
      counts[profession]++;
    }
  }

  // Формируем итоговый массив
  return Object.keys(counts).map((profession) => ({
    profession: profession as TProfession,
    count: counts[profession as TProfession],
  }));
}

// Новый метод: считает общее количество сотрудников по всем профессиям
export function getTotal(userShifts: IUserShift[]): number {
  const professionCounts = getProfessionsWithCounts(userShifts);
  return professionCounts.reduce((total, item) => total + item.count, 0);
}

export function getCurrentShiftID() {
  const pathname = window.location.pathname; // Текущий путь из URL
  const SHIFT_PATH_PREFIX = '/timesheet/shifts/';

  // Проверяем, что путь начинается с нужного префикса
  if (!pathname.startsWith(SHIFT_PATH_PREFIX)) {
    return null;
  }

  // Удаляем префикс и разбиваем на сегменты
  const relativePath = pathname.slice(SHIFT_PATH_PREFIX.length);
  const parts = relativePath.split('/').filter((part) => part.length > 0);

  // Должно быть хотя бы одно непустое значение после префикса
  if (parts.length === 0) {
    return null;
  }

  // Возвращаем первый (и обычно единственный) сегмент после префикса — это ID
  return parts[0];
}
