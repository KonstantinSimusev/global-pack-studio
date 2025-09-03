import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { checkRefreshToken, loginUser, logoutUser } from './actions';

interface ILoginResponse {
  id: string;
  login: string;
  refreshToken: string;
  refreshTokenCreatedAt: string;
}

interface IRefreshTokenResponse {
  refreshToken: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshToken: string | null;
  user: ILoginResponse | null;
  error: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  refreshToken: null,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthenticated: (state: IAuthState) => state.isAuthenticated,
    selectIsLoading: (state: IAuthState) => state.isLoading,
    selectUser: (state: IAuthState) => state.user,
    selectRefreshToken: (state: IAuthState) => state.refreshToken,
    selectError: (state: IAuthState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.user = action.payload;
          state.refreshToken = action.payload.refreshToken;
          state.error = null;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.refreshToken = null;
        state.error = action.error.message ?? 'Неверный логин или пароль';
      })
      // Обработчик для checkRefreshToken
      .addCase(checkRefreshToken.pending, (state) => {
        state.isLoading = true; // Устанавливаем флаг загрузки
      })
      .addCase(
        checkRefreshToken.fulfilled,
        (state, action: PayloadAction<IRefreshTokenResponse>) => {
          state.isAuthenticated = true;
          state.isLoading = false; // Сбрасываем флаг после успешного выполнения
          state.refreshToken = action.payload.refreshToken;
          state.error = null;
        },
      )
      .addCase(checkRefreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false; // Сбрасываем флаг после ошибки
        state.refreshToken = null;
        state.error = action.error.message ?? null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Очищаем ошибку при начале выхода
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка при выходе из системы';
        localStorage.removeItem('refreshToken');
      });
  },
});

export const {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
  selectError,
  selectRefreshToken,
} = authSlice.selectors;
