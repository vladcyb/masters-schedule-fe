import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userSlice } from './userSlice';

const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
