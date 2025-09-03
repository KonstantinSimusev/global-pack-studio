import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkRefreshTokenApi,
  loginUserApi,
  logoutUserApi,
} from '../../../utils/gpsApi';

interface ILoginData {
  login: string;
  password: string;
}

interface ILoginResponse {
  id: string;
  login: string;
  refreshToken: string;
  refreshTokenCreatedAt: string;
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginData): Promise<ILoginResponse> => {
    try {
      // Вызываем API функцию
      const response = await loginUserApi(data);

      // Сохраняем токен в localStorage (опционально)
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error) {
      // Очищаем токены при ошибке
      localStorage.removeItem('refreshToken');

      throw new Error('Неверный логин или пароль');
    }
  },
);

export const checkRefreshToken = createAsyncThunk(
  'auth/refreshToken',
  async () => {
    const storedToken = localStorage.getItem('refreshToken');

    if (!storedToken) {
      // Пойдет в checkRefreshToken.rejected в authSlice
      throw new Error('No refresh token found');
    }

    try {
      const response = await checkRefreshTokenApi(storedToken);

      if (!response) {
        throw new Error('Failed to refresh token');
      }

      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      localStorage.removeItem('refreshToken');

      // Пойдет в checkRefreshToken.rejected в authSlice
      throw error;
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      throw new Error();
    }

    // Используем уже готовый API
    const response = await logoutUserApi(userId);

    if (!response) {
      throw new Error('Ошибка при выходе из системы');
    }

    // Очищаем локальное хранилище
    localStorage.removeItem('refreshToken');

    return response;
  } catch (error) {
    localStorage.removeItem('refreshToken');
    throw error;
  }
});
