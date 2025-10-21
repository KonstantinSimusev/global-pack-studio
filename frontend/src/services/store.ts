import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { authSlice } from './slices/auth/slice';
import { shiftSlice } from './slices/shift/slice';
import { userSlice } from './slices/user/slice';

export const rootReducer = combineSlices(authSlice, shiftSlice, userSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
