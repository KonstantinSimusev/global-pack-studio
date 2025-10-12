import { createAsyncThunk } from '@reduxjs/toolkit';

import { createShiftApi, getShiftsApi } from '../../../utils/gpsApi';
import type { IShift, ISuccess } from '../../../utils/api.interface';
import { delay } from '../../../utils/delay';

export const createShift = createAsyncThunk(
  'shift/create',
  async (data: IShift): Promise<ISuccess> => {
    try {
      // Вызываем API функцию
      const response = await createShiftApi(data);

      // Добавляем задержку кода
      await delay();

      return response;
    } catch (error) {
      // Добавляем задержку кода
      await delay();

      throw error;
    }
  },
);

export const getShifts = createAsyncThunk('shifts/get', async () => {
  try {
    const response = await getShiftsApi();

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    // Пойдет в rejected
    throw error;
  }
});
