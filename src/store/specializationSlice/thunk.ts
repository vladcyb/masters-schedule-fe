import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import actions from './actions';

const SpecializationsThunk = {
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
};

export default SpecializationsThunk;
