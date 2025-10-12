export interface IList<T> {
  total: number;
  items: T[];
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

export interface IAccessToken {
  user: IUser;
  accessToken: string;
}

export interface ISuccess {
  success: boolean;
  message: string;
  user?: IUser;
}

export interface IWorker {
  name: string;
  teamNumber: number;
  count: number;
}

export interface IShift {
  id: string;
  date: Date;
  shiftNumber: number;
  teamNumber: number;
}

export interface IUserShift {
  id: string;
  attendance: string;
  hoursWorked: number;
  section: string | null;
  shiftProfession: string | null;
  userId: string;
  shiftId: string;
}
