import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocationThunk from './thunk';
import { StateType } from './types';
import { LocationType } from '../../shared/types';

const initialState: StateType = {
  loading: false,
  data: [],
  error: false,
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
        state.error = false;
      })
      .addCase(LocationThunk.update.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(LocationThunk.update.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
