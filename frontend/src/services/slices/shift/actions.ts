import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createShiftApi,
  getLastTeamShiftApi,
} from '../../../utils/api/shift.api';
import {
  IShift,
  ISuccess,
} from '../../../utils/api.interface';
import { delay } from '../../../utils/utils';

export const createShift = createAsyncThunk(
  'shift/create',
  async (data: IShift): Promise<ISuccess> => {
    try {
      // Вызываем API функцию
      const response = await createShiftApi(data);

      // Добавляем задержку кода
      await delay();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (error) {
      // Добавляем задержку кода
      await delay();

      throw error;
    }
  },
);

export const getLastTeamShift = createAsyncThunk('shift/last', async () => {
  try {
    const response = await getLastTeamShiftApi();

    // Добавляем задержку кода
    // await delay();

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    // Добавляем задержку кода
    // await delay();

    // Пойдет в rejected
    throw error;
  }
});

