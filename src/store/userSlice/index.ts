import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType, UserDataStateType } from './types';
import UserThunk from './thunk';
import { initialUserData } from './constants';

const initialState: StateType = {
  loading: false,
  data: {
    login: undefined,
    id: undefined,
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    role: undefined,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserDataStateType>) => {
      state.data = payload;
    },
    logout: (state) => {
      state.data = initialUserData;
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
      })
      .addCase(UserThunk.register.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserThunk.register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UserThunk.register.rejected, (state) => {
        state.loading = false;
      });
  },
});