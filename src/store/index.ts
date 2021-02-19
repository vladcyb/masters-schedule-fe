import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './authSlice';
import { specializationsSlice } from './specializationSlice';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    specializations: specializationsSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
