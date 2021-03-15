import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../shared/types';
import { StateType } from './types';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  reducers: {
    set: (state, { payload }: PayloadAction<OrderType[]>) => {
      state.data = payload;
    },
    add: (state, { payload }: PayloadAction<OrderType>) => {
      state.data.push(payload);
    },
  },
  initialState,
});
