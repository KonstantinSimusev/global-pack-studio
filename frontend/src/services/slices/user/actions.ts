// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { addWorkerApi, getTeamUsersApi } from '../../../utils/gpsApi';
// import type { IUser } from '../../../utils/api.interface';
// import { delay } from '../../../utils/utils';

// export const getTeamUsers = createAsyncThunk('users/team', async () => {
//   try {
//     const response = await getTeamUsersApi();

//     // Добавляем задержку кода
//     await delay();

//     if (!response) {
//       throw new Error();
//     }

//     return response;
//   } catch (error) {
//     // Добавляем задержку кода
//     await delay();

//     // Пойдет в checkAccessToken.rejected в authSlice
//     throw error;
//   }
// });

// export const addWorker = createAsyncThunk(
//   'users/worker',
//   async (data: { personalNumber: number }): Promise<IUser> => {
//     try {
//       // Вызываем API функцию
//       const response = await addWorkerApi(data);

//       if (!response) {
//         throw new Error('Работник не найден')
//       }

//       // Добавляем задержку кода
//       await delay();

//       return response;
//     } catch (error) {
//       // Добавляем задержку кода
//       await delay();

//       throw new Error('Работник не найден');
//     }
//   },
// );