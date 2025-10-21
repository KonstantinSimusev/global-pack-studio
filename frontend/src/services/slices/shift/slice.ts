import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createShift, deleteShift, getTeamShifts } from './actions';
import type { IList, IShift } from '../../../utils/api.interface';

interface IShiftState {
  shifts: IShift[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IShiftState = {
  shifts: [],
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
    clearShifts: (state) => {
      state.shifts = [];
    },
  },
  selectors: {
    selectShifts: (state: IShiftState) => state.shifts,
    selectIsLoading: (state: IShiftState) => state.isLoading,
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
      // Обработчик для getTeamShifts
      .addCase(getTeamShifts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getTeamShifts.fulfilled,
        (state, action: PayloadAction<IList<IShift>>) => {
          state.shifts = action.payload.items;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(getTeamShifts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания смены';
      })
      // Обработчик для deleteShift
      .addCase(deleteShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteShift.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка удаления смены';
      });
  },
});

export const { clearShifts, clearError } = shiftSlice.actions;
export const { selectShifts, selectIsLoading, selectError } =
  shiftSlice.selectors;
