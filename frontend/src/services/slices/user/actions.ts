import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWorkersApi } from '../../../utils/gpsApi';
import type { IWorker } from '../../../utils/api.interface';

export const getWorkers = createAsyncThunk(
  'users/workers',
  async (): Promise<IWorker[]> => {
    try {
      const response = await getWorkersApi();

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (error) {
      // Пойдет в rejected
      throw error;
    }
  },
);
