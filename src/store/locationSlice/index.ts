import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import { LocationType } from '../../shared/types';
import { LocationThunk } from './thunk';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<LocationType[]>) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LocationThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(LocationThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(LocationThunk.update.rejected, (state) => {
        state.loading = false;
      });
  },
});
