import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../shared/types';
import { StateType } from './types';
import { OrderThunk } from './thunk';
import { actions as userActions } from '../userSlice/actions';
import { IOrderSetStatus } from '../../API/interfaces';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<OrderType[]>) => {
      state.data = payload;
    },
    add: (state, { payload }: PayloadAction<OrderType>) => {
      state.data.push(payload);
    },
    updateOne: (state, { payload }: PayloadAction<OrderType>) => {
      const index = state.data.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.data[index] = payload;
      }
    },
    setStatus: (state, { payload }: PayloadAction<IOrderSetStatus>) => {
      const found = state.data.find((item) => item.id === payload.id);
      if (found) {
        found.status = payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OrderThunk.create.pending, (state) => {
        state.loading = true;
      })
      .addCase(OrderThunk.create.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(OrderThunk.get.pending, (state) => {
        state.loading = true;
      })
      .addCase(OrderThunk.get.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userActions.logout, () => initialState);
  },
});
