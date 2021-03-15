import { createAction } from '@reduxjs/toolkit';
import { UserDataStateType } from './types';

export const actions = {
  login: createAction<UserDataStateType>('user/login'),
  logout: createAction('user/logout'),
};
