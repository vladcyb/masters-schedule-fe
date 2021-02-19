import { createSlice } from '@reduxjs/toolkit';
import { StateType } from './types';
import AuthThunk from './thunk';

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
      .addCase(AuthThunk.login.pending, (state) => {
        state.loading = true;
      })
      .addCase(AuthThunk.login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AuthThunk.login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AuthThunk.register.pending, (state) => {
        state.loading = true;
      })
      .addCase(AuthThunk.register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AuthThunk.register.rejected, (state) => {
        state.loading = false;
      });
  },
});
