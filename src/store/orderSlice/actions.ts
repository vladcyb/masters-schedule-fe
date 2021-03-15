import { createAction } from '@reduxjs/toolkit';
import { OrderType } from '../../shared/types';

const actions = {
  add: createAction<OrderType>('orders/add'),
  set: createAction<OrderType[]>('orders/set'),
};

export default actions;
