import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createShiftApi,
  deleteShiftApi,
  getTeamShiftsApi,
} from '../../../utils/gpsApi';
import { IShift, ISuccess } from '../../../utils/api.interface';
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

export const getTeamShifts = createAsyncThunk('shifts/get', async () => {
  try {
    const response = await getTeamShiftsApi();

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

export const deleteShift = createAsyncThunk(
  'shift/delete',
  async (id: string): Promise<ISuccess> => {
    try {
      const response = await deleteShiftApi(id);
      await delay();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (error) {
      await delay();
      throw error;
    }
  },
);
