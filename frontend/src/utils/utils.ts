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

export function getCount(array: any[]): number {
  return array.reduce((total, item) => total + item.count, 0);
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
