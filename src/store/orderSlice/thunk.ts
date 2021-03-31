import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';
import {
  IOrderSetMaster,
  IOrderSetServices,
  IOrderSetStartDate,
} from '../../API/interfaces';
import { OrderStatus } from '../../shared/types';

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
    async (props: IOrderSetStartDate, { rejectWithValue, dispatch }) => {
      const response = await API.Order.setStartDate(props);
      const { ok, error, result } = response.data;
      if (ok) {
        dispatch(actions.updateOne(result));
        return '';
      }
      return rejectWithValue(error);
    },
  ),
  setServices: createAsyncThunk(
    'orders/setServices',
    async (props: IOrderSetServices, { dispatch, rejectWithValue }) => {
      const { data: { ok, result, error } } = await API.Order.setServices(props);
      if (ok) {
        dispatch(actions.updateOne(result));
        return '';
      }
      return rejectWithValue(error);
    },
  ),
  setMaster: createAsyncThunk(
    'orders/setServices',
    async (props: IOrderSetMaster, { dispatch, rejectWithValue }) => {
      const { data: { ok, result, error } } = await API.Order.setMaster(props);
      if (ok) {
        dispatch(actions.updateOne(result));
        return '';
      }
      return rejectWithValue(error);
    },
  ),
  deny: createAsyncThunk(
    'orders/setStatus',
    async (id: number, { dispatch, rejectWithValue }) => {
      const { data: { ok, error } } = await API.Order.deny(id);
      if (ok) {
        dispatch(actions.setStatus({ id, status: OrderStatus.DENIED }));
        return '';
      }
      return rejectWithValue(error);
    },
  ),
};
