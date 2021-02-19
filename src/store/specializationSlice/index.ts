import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import SpecializationsThunk from './thunk';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const specializationsSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<StateType>) => {
      state = payload;
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
      });
  },
});
