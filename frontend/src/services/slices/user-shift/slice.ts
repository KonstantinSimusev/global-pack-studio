import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createUserShift,
  createUsersShifts,
  deleteUserShift,
  getUsersShifts,
  updateUserShift,
} from './actions';
import type { IList, IUserShift } from '../../../utils/api.interface';

interface IUserShiftState {
  usersShifts: IUserShift[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserShiftState = {
  usersShifts: [],
  isLoading: false,
  error: null,
};

export const userShiftSlice = createSlice({
  name: 'userShift',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  selectors: {
    selectUsersShifts: (state: IUserShiftState) => state.usersShifts,
    selectIsLoading: (state: IUserShiftState) => state.isLoading,
    selectError: (state: IUserShiftState) => state.error,
    selectUserShiftById: (state: IUserShiftState, id: string) =>
      state.usersShifts.find((shift) => shift.id === id) || null,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для createUsersShifts
      .addCase(createUserShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserShift.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUserShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания смены';
      })
      // Обработчик для createUsersShifts
      .addCase(createUsersShifts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUsersShifts.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUsersShifts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания смены';
      })
      // Обработчик для getUsersShifts
      .addCase(getUsersShifts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getUsersShifts.fulfilled,
        (state, action: PayloadAction<IList<IUserShift>>) => {
          state.usersShifts = action.payload.items;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(getUsersShifts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка получения смены';
      })
      // Обработчик для updateUserShift
      .addCase(updateUserShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserShift.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка обновления смены';
      })
      // Обработчик для deleteUserShift
      .addCase(deleteUserShift.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserShift.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUserShift.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка удаления смены';
      });
  },
});

export const { clearError } = userShiftSlice.actions;

export const {
  selectUsersShifts,
  selectUserShiftById,
  selectIsLoading,
  selectError,
} = userShiftSlice.selectors;
