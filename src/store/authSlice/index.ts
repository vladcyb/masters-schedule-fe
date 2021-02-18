import { createSlice } from '@reduxjs/toolkit';
import { StateType } from './types';
import UserThunk from './thunk';

const initialState: StateType = {
  auth: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.auth = true;
    },
    logout: (state) => {
      state.auth = false;
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
