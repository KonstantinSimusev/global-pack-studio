import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getTeamUsers } from './actions';
import type { IUser } from '../../../utils/api.interface';

interface IUserState {
  teamUsers: IUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  teamUsers: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state: IUserState) => state.isLoading,
    selectTeamUsers: (state: IUserState) => state.teamUsers,
    selectError: (state: IUserState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для getWorkers
      // .addCase(getWorkers.pending, (state) => {
      //   state.users = [];
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   getWorkers.fulfilled,
      //   (state, action: PayloadAction<IWorker[]>) => {
      //     state.users = action.payload;
      //     state.isLoading = false;
      //     state.error = null;
      //   },
      // )
      // .addCase(getWorkers.rejected, (state, action) => {
      //   state.users = [];
      //   state.isLoading = false;
      //   state.error = action.error.message ?? 'Ошибка получения списка';
      // })
      // Обработчик для getTeamUsers
      .addCase(getTeamUsers.pending, (state) => {
        state.teamUsers = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getTeamUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.teamUsers = action.payload;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(getTeamUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.teamUsers = [];
        state.error = action.error.message ?? 'Ошибка получения списка';
      });
  },
});

export const { selectTeamUsers, selectIsLoading, selectError } =
  userSlice.selectors;
