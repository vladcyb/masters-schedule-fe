import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType, UserDataStateType } from './types';
import UserThunk from './thunk';
import { initialUserData } from './constants';
import { OrderType } from '../../shared/types';

const initialState: StateType = {
  loading: false,
  fetched: false,
  data: {
    login: undefined,
    id: undefined,
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    role: undefined,
  },
  orders: {
    loading: false,
    data: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserDataStateType>) => {
      state.data = payload;
    },
    logout: (state) => {
      state.data = initialUserData;
    },
    setOrders: (state, { payload }: PayloadAction<OrderType[]>) => {
      state.orders.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserThunk.login.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserThunk.login.fulfilled, (state) => {
        state.loading = false;
        state.fetched = true;
      })
      .addCase(UserThunk.login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UserThunk.register.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserThunk.register.fulfilled, (state) => {
        state.loading = false;
        state.fetched = true;
      })
      .addCase(UserThunk.register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UserThunk.getMe.fulfilled, (state) => {
        state.fetched = true;
      })
      .addCase(UserThunk.getOrders.pending, (state) => {
        state.orders.loading = true;
      })
      .addCase(UserThunk.getOrders.rejected, (state) => {
        state.orders.loading = false;
      })
      .addCase(UserThunk.getOrders.fulfilled, (state) => {
        state.orders.loading = false;
      });
  },
});
