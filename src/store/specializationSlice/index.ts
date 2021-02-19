import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SpecializationsThunk from './thunk';
import { StateType } from './types';
import { SpecializationType } from '../../shared/types';

const initialState: StateType = {
  loading: false,
  data: [],
  error: false,
};

export const specializationsSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<SpecializationType[]>) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SpecializationsThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(SpecializationsThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationsThunk.update.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
