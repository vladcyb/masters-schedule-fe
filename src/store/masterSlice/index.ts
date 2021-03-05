import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MasterStatus, ScheduleType, StateType } from './types';

const initialState: StateType = {
  loading: false,
  data: {
    schedule: {
      id: 0,
      hours: '',
      status: MasterStatus.IDLE,
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
});
