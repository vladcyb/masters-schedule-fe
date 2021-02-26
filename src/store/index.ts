import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import instance from '../API/axios';
import actions from './userSlice/actions';
import { specializationsSlice } from './specializationSlice';
import { locationSlice } from './locationSlice';
import { userSlice } from './userSlice';
import { serviceSlice } from './serviceSlice';

const store = configureStore({
  reducer: combineReducers({
    specializations: specializationsSlice.reducer,
    locations: locationSlice.reducer,
    user: userSlice.reducer,
    services: serviceSlice.reducer,
  }),
});

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch(actions.logout());
  }
  return Promise.reject(error);
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
