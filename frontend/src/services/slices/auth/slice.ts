import { createSlice } from '@reduxjs/toolkit';
import { checkRefreshToken } from './actions';

interface IAuthState {
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthenticated: (state: IAuthState) => state.isAuthenticated,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRefreshToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(checkRefreshToken.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { selectIsAuthenticated } = authSlice.selectors;
