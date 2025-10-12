import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getWorkers } from './actions';
import type { IWorker } from '../../../utils/api.interface';

interface IWorkerState {
  isLoading: boolean;
  workers: IWorker[];
  error: string | null;
}

const initialState: IWorkerState = {
  isLoading: false,
  workers: [],
  error: null,
};

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state: IWorkerState) => state.isLoading,
    selectWorkers: (state: IWorkerState) => state.workers,
    selectError: (state: IWorkerState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для getWorkers
      .addCase(getWorkers.pending, (state) => {
        state.isLoading = true;
        state.workers = [];
        state.error = null;
      })
      .addCase(
        getWorkers.fulfilled,
        (state, action: PayloadAction<IWorker[]>) => {
          state.isLoading = false;
          state.workers = action.payload;
          state.error = null;
        },
      )
      .addCase(getWorkers.rejected, (state, action) => {
        state.isLoading = false;
        state.workers = [];
        state.error = action.error.message ?? 'Ошибка получения списка';
      });
  },
});

export const { selectIsLoading, selectWorkers, selectError } =
  workerSlice.selectors;
