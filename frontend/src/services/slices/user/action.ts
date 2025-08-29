import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi } from '../../../utils/api';

interface ILoginData {
  login: string;
  password: string;
}

// Создаем thunk для авторизации пользователя
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginData) => {
    try {
      const response = await loginUserApi(data);
      return response;
    } catch (error) {
      throw new Error('Ошибка авторизации');
    }
  },
);

// // Создаем thunk для получения пользователей
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await getUsersApi();
//   return response;
// });
