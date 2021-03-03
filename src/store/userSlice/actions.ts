import { createAction } from '@reduxjs/toolkit';
import { UserDataStateType } from './types';
import { OrderType } from '../../shared/types';

const actions = {
  login: createAction<UserDataStateType>('user/login'),
  logout: createAction('user/logout'),
  setOrders: createAction<OrderType[]>('user/setOrders'),
  addOrder: createAction<OrderType>('user/addOrder'),
};

export default actions;
