import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { checkAccessToken, loginUser, logoutUser } from './actions';
import type { IUser } from '../../../utils/api.interface';

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  selectors: {
    selectIsAuthenticated: (state: IAuthState) => state.isAuthenticated,
    selectIsLoading: (state: IAuthState) => state.isLoading,
    selectUser: (state: IAuthState) => state.user,
    selectError: (state: IAuthState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? 'Неверный логин или пароль';
      })
      // Обработчик для checkRefreshToken
      .addCase(checkAccessToken.pending, (state) => {
        state.isLoading = true; // Устанавливаем флаг загрузки
      })
      .addCase(
        checkAccessToken.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isAuthenticated = true;
          state.isLoading = false; // Сбрасываем флаг после успешного выполнения
          state.user = action.payload;
          state.error = null;
        },
      )
      .addCase(checkAccessToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false; // Сбрасываем флаг после ошибки
        state.error = action.error.message ?? 'Ошибка токена';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Очищаем ошибку при начале выхода
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка при выходе из системы';
      });
  },
});

export const { clearError } = authSlice.actions;

export const {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
  selectError,
} = authSlice.selectors;
