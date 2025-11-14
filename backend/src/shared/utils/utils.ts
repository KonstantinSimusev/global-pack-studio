import { ISchedule } from '../interfaces/api.interface';

export function getNextShift(teamNumber: number): ISchedule {
  const shifts = [
    {
      date: new Date('2025-10-15'),
      shiftNumber: 1,
      teamNumber: 4,
    },
    {
      date: new Date('2025-10-15'),
      shiftNumber: 2,
      teamNumber: 3,
    },
    {
      date: new Date('2025-10-16'),
      shiftNumber: 1,
      teamNumber: 2,
    },
    {
      date: new Date('2025-10-16'),
      shiftNumber: 2,
      teamNumber: 1,
    },
  ];

  // Находим смену
  const shift = shifts.find((shift) => shift.teamNumber === teamNumber);

  if (!shift) {
    throw new Error('Смена не найдена');
  }

  const startDate = new Date(shift.date);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);

  const startShiftNumber = shift.shiftNumber;

  // Создаем объект для результата
  let result: ISchedule = {
    date: new Date(startDate),
    shiftNumber: startShiftNumber,
    teamNumber: shift.teamNumber,
  };

  let currentDate = new Date(startDate);
  let currentShiftNumber = startShiftNumber;

  // Создаем массив смен
  while (currentDate <= endDate) {
    result.date = new Date(currentDate);
    result.shiftNumber = currentShiftNumber;
    result.teamNumber = shift.teamNumber;

    // Увеличиваем дату на 2 дня
    currentDate.setDate(currentDate.getDate() + 2);

    // Чередуем смены (1 <-> 2)
    currentShiftNumber = currentShiftNumber === 1 ? 2 : 1;
  }

  return result;
}

export function compareShifts(obj1: ISchedule, obj2: ISchedule): boolean {
  // Нормализация дат (убираем время)
  const normalizeDate = (date: Date): Date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  return (
    normalizeDate(obj1.date).toISOString() ===
      normalizeDate(obj2.date).toISOString() &&
    obj1.shiftNumber === obj2.shiftNumber &&
    obj1.teamNumber === obj2.teamNumber
  );
}