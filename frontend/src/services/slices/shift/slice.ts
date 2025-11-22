import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createShift, getLastTeamShift } from './actions';

import type { IShift } from '../../../utils/api.interface';

interface IShiftState {
  shift: IShift | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IShiftState = {
  shift: null,
  isLoading: false,
  error: null,
};

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetShift: (state) => {
      state.shift = null;
      state.error = null;
    },
  },
  selectors: {
    selectCurrentShift: (state: IShiftState) => state.shift,
    selectCurrentShiftId: (state: IShiftState) =>
      state.shift ? state.shift.id : null,
    selectIsLoadingShift: (state: IShiftState) => state.isLoading,
    selectError: (state: IShiftState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для createShift
      .addCase(createShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createShift.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания смены';
      })
      // Обработчик для getLastTeamShift
      .addCase(getLastTeamShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getLastTeamShift.fulfilled,
        (state, action: PayloadAction<IShift>) => {
          state.shift = action.payload;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(getLastTeamShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания смены';
      });
  },
});

export const { resetShift, clearError } = shiftSlice.actions;
export const {
  selectCurrentShift,
  selectCurrentShiftId,
  selectIsLoadingShift,
  selectError,
} = shiftSlice.selectors;
