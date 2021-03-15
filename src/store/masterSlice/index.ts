import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MasterStatus, ScheduleType, StateType } from './types';
import { actions as userActions } from '../userSlice/actions';

const initialState: StateType = {
  loading: false,
  data: {
    schedule: {
      id: 0,
      hours: '',
      status: MasterStatus.IDLE,
    },
    orders: {
      loading: false,
      data: [],
    },
  },
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    setSchedule: (state, { payload }: PayloadAction<ScheduleType>) => {
      state.data.schedule = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userActions.logout, () => initialState);
  },
});
