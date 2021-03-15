import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';

export const SpecializationsThunk = {
  update: createAsyncThunk(
    'specializations/update',
    async (arg, { dispatch, rejectWithValue }) => {
      const requestResult = await API.Specialization.get();
      const { ok, result } = requestResult.data;
      if (ok) {
        dispatch(actions.set(result));
      } else {
        return rejectWithValue('');
      }
      return 0;
    },
  ),
  create: createAsyncThunk(
    'specializations/create',
    async (props: FormData, { dispatch, rejectWithValue }) => {
      const { data: { ok, error, result } } = await API.Specialization.create(props);
      if (!ok) {
        return rejectWithValue(error);
      }
      dispatch(actions.add(result));
      return 0;
    },
  ),
};
