import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './action';

interface IUser {
  id: string;
  login: string;
}

export interface IUserState {
  user: IUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: string | null;
}

export const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Действие для выхода из системы
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.loginError = null;
    },
    // Действие для установки пользователя
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  selectors: {
    // Селекторы для получения данных из состояния
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getIsLoading: (state) => state.isLoading,
    getLoginError: (state) => state.loginError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.isLoading = true),
        (state.loginError = null);
      })
      // .addCase(loginUser.fulfilled, (state, action: ?) => {
      //   state.isLoading = false,
      //   state.isAuthChecked = true,
      //   state.isAuthChecked = true,
      //   state.user = action.payload.?
      // })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.loginError = action.error.message || 'Ошибка авторизации';
      });
  },
});

// // Тип для ответа регистрации
// interface IRegistrationResponse {
//   success: boolean;
//   message: string;
//   user?: {
//     id: number;
//     login: string;
//     email: string;
//   };
//   error?: {
//     code: number;
//     message: string;
//   };
// }

// // Определяем типы состояний
// interface IUserState {
//   users: IUser[];
//   total: number;
//   status: 'idle' | 'loading' | 'failed';
//   error: string | null;
// }

// const initialState: IUserState = {
//   users: [],
//   total: 0,
//   status: 'idle',
//   error: null,
// };

// // Создаем slice
// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(
//         fetchUsers.fulfilled,
//         (state, action: PayloadAction<IUserResponse>) => {
//           state.status = 'idle';
//           state.users = action.payload.users;
//           state.total = action.payload.total;
//         },
//       )
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error?.message ?? null;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(
//         registerUser.fulfilled,
//         (state, action: PayloadAction<IRegistrationResponse>) => {
//           state.status = 'idle';
//           // Здесь можно добавить логику обработки успешного ответа
//           // Используем action для обработки данных
//           if (action.payload.success) {
//             // Добавляем нового пользователя в список
//             const newUser = action.payload.user;
//             if (newUser) {
//               state.users.push({
//                 id: newUser.id.toString(),
//                 login: newUser.login,
//                 email: newUser.email,
//               });
//             }
//           }
//         },
//       )
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error?.message ?? null;
//       });
//   },
// });
