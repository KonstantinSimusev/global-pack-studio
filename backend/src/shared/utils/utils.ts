import { ELocation, EUnit } from '../enums/enums';
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
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.ANGZ,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.ANO,
    count: 0,
  },
  {
    location: ELocation.LINE_2,
    unit: EUnit.AI,
    count: 0,
  },
  {
    location: ELocation.LINE_3,
    unit: EUnit.ANGZ_3,
    count: 0,
  },
];

// export function getShifts(date: Date, shiftNumber: number, teamNumber: number) {
//   const start = new Date(date);
//   const now = new Date(); // Текущие дата и время (в UTC)
//   const shifts = [];

//   let currentShift = shiftNumber;
//   let targetDate = new Date(start);

//   // Нормализуем targetDate до начала дня (00:00:00.000 UTC) для расчётов
//   targetDate.setUTCHours(0, 0, 0, 0);

//   while (true) {
//     let shiftStart: Date;
//     let shiftEnd: Date;

//     if (currentShift === 1) {
//       // Смена 1: начинается в предыдущий день в 19:00 UTC
//       shiftStart = new Date(targetDate);
//       shiftStart.setUTCDate(shiftStart.getUTCDate() - 1);
//       shiftStart.setUTCHours(15, 0, 0, 0);

//       shiftEnd = new Date(targetDate);
//       shiftEnd.setUTCHours(3, 0, 0, 0);
//     } else {
//       // Смена 2: начинается и заканчивается в targetDate
//       shiftStart = new Date(targetDate);
//       shiftStart.setUTCHours(3, 0, 0, 0);

//       shiftEnd = new Date(targetDate);
//       shiftEnd.setUTCHours(15, 0, 0, 0);
//     }

//     // ПРЕКРАЩАЕМ ЦИКЛ, если начало смены (shiftStart) УЖЕ В БУДУЩЕМ
//     if (shiftStart > now) {
//       break;
//     }

//     // Добавляем смену, только если её начало не выходит за «сейчас»
//     shifts.push({
//       shift: currentShift,
//       team: teamNumber,
//       date: targetDate.toISOString().split('T')[0], // YYYY-MM-DD
//       startUTC: shiftStart.toISOString(),
//       endUTC: shiftEnd.toISOString(),
//     });

//     // Переходим к следующей дате: +2 дня от текущего targetDate
//     targetDate.setUTCDate(targetDate.getUTCDate() + 2);

//     // Чередуем смены: 1 ↔ 2
//     currentShift = currentShift === 1 ? 2 : 1;
//   }

//   return shifts;
// }

// export function getAllShifts(
//   getShiftsFn: (
//     date: Date,
//     shiftNumber: number,
//     teamNumber: number,
//   ) => {
//     shift: number;
//     team: number;
//     date: string;
//     startUTC: string;
//     endUTC: string;
//   }[],
//   shiftsConfig: {
//     date: Date;
//     shiftNumber: number;
//     teamNumber: number;
//   }[],
// ): {
//   shift: number;
//   team: number;
//   date: string;
//   startUTC: string;
//   endUTC: string;
// } {
//   const now = new Date(); // Текущее время в UTC

//   // Собираем все возможные смены из всех конфигураций
//   const allShifts: {
//     shift: number;
//     team: number;
//     date: string;
//     startUTC: string;
//     endUTC: string;
//   }[] = [];

//   for (const config of shiftsConfig) {
//     const shifts = getShiftsFn(
//       config.date,
//       config.shiftNumber,
//       config.teamNumber,
//     );
//     allShifts.push(...shifts);
//   }

//   // Находим смену, которая покрывает текущий момент
//   for (const shift of allShifts) {
//     const start = new Date(shift.startUTC);
//     const end = new Date(shift.endUTC);

//     if (now >= start && now < end) {
//       return shift; // Возвращаем первую подходящую смену
//     }
//   }

//   return null; // Если ни одна смена не активна сейчас

//   // return allShifts
// }

// export const shifts = [
//   {
//     date: new Date('2025-10-15'),
//     shiftNumber: 1,
//     teamNumber: 4,
//   },
//   {
//     date: new Date('2025-10-15'),
//     shiftNumber: 2,
//     teamNumber: 3,
//   },
//   {
//     date: new Date('2025-10-16'),
//     shiftNumber: 1,
//     teamNumber: 2,
//   },
//   {
//     date: new Date('2025-10-16'),
//     shiftNumber: 2,
//     teamNumber: 1,
//   },
// ];

// export const currentShift = getCurrentShift(getShifts, shifts);

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
