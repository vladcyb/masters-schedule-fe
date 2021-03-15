import { createAction } from '@reduxjs/toolkit';
import { UserDataStateType } from './types';

const actions = {
  login: createAction<UserDataStateType>('user/login'),
  logout: createAction('user/logout'),
};

export default actions;
