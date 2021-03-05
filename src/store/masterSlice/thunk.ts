import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';
import { IMasterSetSchedule } from '../../API/interfaces';

export const MasterThunk = {
  getSchedule: createAsyncThunk(
    'master/getSchedule',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Master.getSchedule();
      if (ok) {
        dispatch(actions.setSchedule(result));
      }
    },
  ),
  setSchedule: createAsyncThunk(
    'master/setSchedule',
    async (props: IMasterSetSchedule, { dispatch, rejectWithValue }) => {
      const { data: { ok, result } } = await API.Master.setSchedule(props);
      if (ok) {
        dispatch(actions.setSchedule(result));
        return '';
      }
      return rejectWithValue('');
    },
  ),
};
