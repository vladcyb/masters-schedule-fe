import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';

const initialState: StateType = {
  token: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | undefined>) => {
      state.token = payload;
    },
  },
});
