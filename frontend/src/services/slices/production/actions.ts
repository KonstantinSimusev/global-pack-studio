import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductionsApi } from '../../../utils/api/production.api';

import { IList, IProduction } from '../../../utils/api.interface';

// import { delay } from '../../../utils/utils';

export const getProductions = createAsyncThunk(
  'shifts/productions',
  async (shiftId: string): Promise<IList<IProduction>> => {
    try {
      const response = await getProductionsApi(shiftId);

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
  },
);
