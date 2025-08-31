import { createSlice } from '@reduxjs/toolkit';
import { checkRefreshToken } from './actions';

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthenticated: (state: IAuthState) => state.isAuthenticated,
    selectIsLoading: (state: IAuthState) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRefreshToken.pending, (state) => {
        state.isLoading = true; // Устанавливаем флаг загрузки
      })
      .addCase(checkRefreshToken.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false; // Сбрасываем флаг после успешного выполнения
      })
      .addCase(checkRefreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false; // Сбрасываем флаг после ошибки
      });
  },
});

export const { selectIsAuthenticated, selectIsLoading } = authSlice.selectors;
