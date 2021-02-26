import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import { ServiceType } from '../../shared/types';
import { ServiceThunk } from './thunk';

const initialState: StateType = {
  loading: false,
  data: [],
};

export const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<ServiceType[]>) => {
      state.data = payload;
    },
    add: (state, { payload }: PayloadAction<ServiceType>) => {
      state.data.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ServiceThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(ServiceThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ServiceThunk.update.rejected, (state) => {
        state.loading = false;
      });
  },
});
