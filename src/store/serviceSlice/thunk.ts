import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';

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
};
