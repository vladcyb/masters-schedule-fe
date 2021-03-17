import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';
import { IOrderSetStartDate } from '../../API/interfaces';

export const OrderThunk = {
  get: createAsyncThunk(
    'orders/get',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Order.getAll();
      if (ok) {
        dispatch(actions.set(result));
      }
    },
  ),
  create: createAsyncThunk(
    'orders/create',
    async (props: any, { dispatch, rejectWithValue }) => { // TODO: any
      const { data: { ok, result } } = await API.Order.create(props);
      if (ok) {
        dispatch(actions.add(result));
        return '';
      }
      return rejectWithValue('');
    },
  ),
  setStartDate: createAsyncThunk(
    'orders/setStartDate',
    async (props: IOrderSetStartDate, { rejectWithValue }) => {
      const response = await API.Order.setStartDate(props);
      const { ok, error } = response.data;
      if (ok) {
        return '';
      }
      return rejectWithValue(error);
    },
  ),
};
