export interface ApiListResponse<T> {
  total: number;
  items: T[];
}

export interface IUser {
  id: string;
  login: string;
}
