export interface ApiListResponse<T> {
  total: number;
  items: T[];
}

export interface IUserSafeResponse {
  id: string;
  login: string;
  refreshToken: string | null;
  refreshTokenCreatedAt: Date | null;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
  id: string;
}
