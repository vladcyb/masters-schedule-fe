import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';

export const OrderThunk = {
  get: createAsyncThunk(
    'user/getOrders',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Order.getAll();
      if (ok) {
        dispatch(actions.set(result));
      }
    },
  ),
  create: createAsyncThunk(
    'user/createOrder',
    async (props: any, { dispatch, rejectWithValue }) => {
      const { data: { ok, result } } = await API.Order.create(props);
      if (ok) {
        dispatch(actions.add(result));
        return '';
      }
      return rejectWithValue('');
    },
  ),
};
