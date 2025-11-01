export interface IList<T> {
  total: number;
  items: T[];
}

export interface IUser {
  id?: string;
  positionCode?: number;
  lastName?: string;
  firstName?: string;
  patronymic?: string;
  profession?: string;
  grade?: number;
  personalNumber?: number;
  teamNumber?: number;
  currentTeamNumber?: number;
  workSchedule?: string;
  workshopCode?: string;
  role?: string;
  sortOrder?: number;
}

export interface IShift {
  id: string;
  date: Date;
  shiftNumber: number;
  teamNumber: number;
}

export interface IUserShift {
  id: string;
  workStatus: string;
  workPlace: string;
  shiftProfession: string;
  workHours: number;
}

export interface SheduleEntry {
  date: Date;
  shiftNumber: number;
  teamNumber: number;
}

export interface ISuccess {
  message?: string;
  accessToken?: string;
  user?: IUser;
}
