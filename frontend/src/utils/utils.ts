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

export function formatProductionUnit(unit: string | undefined | null): string {
  if (!unit) return '';

  switch (unit) {
    case 'СТАН':
      return 'СТАН-2000';
    case 'АИ':
      return 'Агрегат Испекции';
    case 'АНО':
      return 'АНО-ГЦ';
    default:
      return unit;
  }
}
