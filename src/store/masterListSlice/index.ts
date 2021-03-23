import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import { MasterType } from '../../shared/types';
import { MasterListThunk } from './thunk';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const masterListSlice = createSlice({
  name: 'masterList',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<MasterType[]>) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(MasterListThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(MasterListThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(MasterListThunk.update.rejected, (state) => {
        state.loading = false;
      });
  },
});
