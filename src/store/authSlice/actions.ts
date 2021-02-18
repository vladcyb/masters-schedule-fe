import { createAction } from '@reduxjs/toolkit';

const actions = {
  login: createAction('auth/login'),
  logout: createAction('auth/logout'),
};

export default actions;
