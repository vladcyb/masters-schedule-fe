import { createAction } from '@reduxjs/toolkit';

const actions = {
  login: createAction('user/login'),
  logout: createAction('user/logout'),
};

export default actions;
