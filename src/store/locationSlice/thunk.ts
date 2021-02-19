import { createAsyncThunk } from '@reduxjs/toolkit';
import actions from './actions';
import API from '../../API';

const LocationThunk = {
  update: createAsyncThunk(
    'location/update',
    async (arg, { dispatch }) => {
      const requestResult = await API.Location.get();
      const { ok, result } = requestResult.data;
      if (ok) {
        dispatch(actions.set(result));
      }
    },
  ),
};

export default LocationThunk;
