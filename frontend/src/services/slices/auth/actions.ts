import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkRefreshTokenApi } from '../../../utils/gpsApi';

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
