import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
