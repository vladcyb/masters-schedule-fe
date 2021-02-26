import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';
import { IServiceCreate } from '../../API/interfaces';

export const ServiceThunk = {
  update: createAsyncThunk(
    'services/update',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Service.get();
      if (ok) {
        await dispatch(actions.set(result));
      }
    },
  ),
  create: createAsyncThunk(
    'services/create',
    async (props: IServiceCreate, { dispatch, rejectWithValue }) => {
      const { data: { ok, result, error } } = await API.Service.create(props);
      if (ok) {
        dispatch(actions.add(result));
        return 0;
      }
      return rejectWithValue(error);
    },
  ),
};
