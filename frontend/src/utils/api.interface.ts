export interface ApiListResponse<T> {
  total: number;
  items: T[];
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUser {
  id?: string;
  profession?: string;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
  id: string;
}
