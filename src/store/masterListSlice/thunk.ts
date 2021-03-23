import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';

export const MasterListThunk = {
  update: createAsyncThunk(
    'masterList/update',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Master.getAll();
      if (ok) {
        dispatch(actions.set(result));
      }
    },
  ),
};
