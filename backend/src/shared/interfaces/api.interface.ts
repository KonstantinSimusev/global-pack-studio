export interface ApiListResponse<T> {
  total: number;
  items: T[];
}

export interface ILogin {
  user: IUser;
  accessToken: string;
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
