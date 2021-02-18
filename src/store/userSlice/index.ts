import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import UserThunk from './thunk';

const initialState: StateType = {
  token: undefined,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | undefined>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserThunk.login.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserThunk.login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UserThunk.login.rejected, (state) => {
        state.loading = false;
      });
  },
});
