import { createAction } from '@reduxjs/toolkit';
import { SetTokenPT } from './types';

const actions = {
  setToken: createAction<SetTokenPT>('user/setToken'),
  clearToken: createAction('user/clearToken'),
};

export default actions;
