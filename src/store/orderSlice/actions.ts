import { createAction } from '@reduxjs/toolkit';
import { OrderType } from '../../shared/types';
import { IOrderSetStatus } from '../../API/interfaces';

export const actions = {
  add: createAction<OrderType>('orders/add'),
  set: createAction<OrderType[]>('orders/set'),
  updateOne: createAction<OrderType>('orders/updateOne'),
  setStatus: createAction<IOrderSetStatus>('orders/setStatus'),
};
