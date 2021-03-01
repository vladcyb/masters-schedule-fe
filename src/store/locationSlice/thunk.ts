import { createAsyncThunk } from '@reduxjs/toolkit';
import actions from './actions';
import API from '../../API';
import { ILocationCreate } from '../../API/interfaces';

export const LocationThunk = {
  update: createAsyncThunk(
    'locations/update',
    async (arg, { dispatch, rejectWithValue }): Promise<any> => {
      const requestResult = await API.Location.get();
      const { ok, result } = requestResult.data;
      if (ok) {
        dispatch(actions.set(result));
      } else {
        return rejectWithValue('');
      }
      return 0;
    },
  ),
  getTypes: createAsyncThunk(
    'locations/getTypes',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Location.getTypes();
      if (ok) {
        dispatch(actions.setTypes(result));
      }
    },
  ),
  create: createAsyncThunk(
    'locations/create',
    async (props: ILocationCreate, { dispatch, rejectWithValue }) => {
      const { data: { ok, result } } = await API.Location.create(props);
      if (ok) {
        dispatch(actions.add(result));
        return '';
      }
      return rejectWithValue('');
    },
  ),
  delete: createAsyncThunk(
    'locations/delete',
    async (id: number, { dispatch, rejectWithValue }) => {
      const { data: { ok, error } } = await API.Location.delete(id);
      if (!ok) {
        return rejectWithValue(error);
      }
      dispatch(actions.delete(id));
      return '';
    },
  ),
};
