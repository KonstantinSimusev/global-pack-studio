import { EArea, ELocation, ERailway, EUnit } from '../enums/enums';
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

export const productions = [
  {
    location: ELocation.LINE_1,
    unit: EUnit.STAN,
    sortOrder: 1,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.ANGZ,
    sortOrder: 2,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.ANO,
    sortOrder: 3,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.AI,
    sortOrder: 4,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    unit: EUnit.ANGZ_3,
    sortOrder: 5,
    count: 0,
  },
];

export const shipments = [
  {
    location: ELocation.LINE_1,
    railway: ERailway.TUPIC_8,
    sortOrder: 1,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    railway: ERailway.TUPIC_6,
    sortOrder: 2,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    railway: ERailway.TUPIC_7,
    sortOrder: 3,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    railway: ERailway.TUPIC_10,
    sortOrder: 4,
    count: 0,
  },
];

export const packs = [
  {
    location: ELocation.LINE_1,
    area: EArea.PACK,
    sortOrder: 1,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    area: EArea.PACK,
    sortOrder: 2,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    area: EArea.PACK,
    sortOrder: 3,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    area: EArea.LUM,
    sortOrder: 4,
    count: 0,
  },
];

export const fixs = [
  {
    location: ELocation.LINE_1,
    railway: ERailway.TUPIC_8,
    sortOrder: 1,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    railway: ERailway.TUPIC_6,
    sortOrder: 2,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    railway: ERailway.TUPIC_7,
    sortOrder: 3,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    railway: ERailway.TUPIC_10,
    sortOrder: 4,
    count: 0,
  },
];

export const residues = [
  {
    location: ELocation.LINE_1,
    area: EArea.PACK,
    sortOrder: 1,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    area: EArea.PACK,
    sortOrder: 2,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    area: EArea.PACK,
    sortOrder: 3,
    count: 0,
  },
];

export const shifts = [
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

export function getShifts(date: Date, shiftNumber: number, teamNumber: number) {
  const start = new Date(date);
  const now = new Date();

  const shifts = [];

  let currentShift = shiftNumber;
  let targetDate = new Date(start);

  // Нормализуем targetDate до 00:00:00.000 UTC
  targetDate.setUTCHours(0, 0, 0, 0);

  while (true) {
    let shiftStart: Date;
    let shiftEnd: Date;

    if (currentShift === 1) {
      // Смена 1: начинается в предыдущий день в 19:30 UTC
      shiftStart = new Date(targetDate);
      shiftStart.setUTCDate(shiftStart.getUTCDate() - 1);
      shiftStart.setUTCHours(19, 30, 0, 0);

      shiftEnd = new Date(targetDate);
      shiftEnd.setUTCHours(7, 30, 0, 0);
    } else {
      // Смена 2: начинается и заканчивается в targetDate
      shiftStart = new Date(targetDate);
      shiftStart.setUTCHours(7, 30, 0, 0);

      shiftEnd = new Date(targetDate);
      shiftEnd.setUTCHours(19, 30, 0, 0);
    }

    // Формируем объект смены ДО проверки
    const shift = {
      shift: currentShift,
      team: teamNumber,
      date: targetDate.toISOString().split('T')[0],
      startUTC: shiftStart.toISOString(),
      endUTC: shiftEnd.toISOString(),
    };

    // Проверяем, не является ли смена будущей
    if (shift.startUTC > now.toISOString()) {
      break; // Все последующие смены тоже будут в будущем — выходим
    }

    console.log('shift: ', shift.startUTC);
    console.log('now: ', now.toLocaleString());
    console.log(shift.endUTC < now.toLocaleString());

    shifts.push(shift);

    // Переходим к следующей смене
    targetDate.setUTCDate(targetDate.getUTCDate() + 2);
    currentShift = currentShift === 1 ? 2 : 1;
  }

  return shifts;
}
