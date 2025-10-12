export interface IList<T> {
  total: number;
  items: T[];
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUser {
  id: string;
  positionCode: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  profession: string;
  personalNumber: number;
  teamNumber: number;
  workSchedule: string;
  workshopCode: string;
}

export interface ISuccess {
  success: boolean;
  message: string;
  id?: string;
}

export interface IShift {
  id?: string;
  date: Date;
  shiftNumber: number;
  teamNumber: number;
}

export interface IWorker {
  name: string;
  teamNumber: number;
  count: number;
}
