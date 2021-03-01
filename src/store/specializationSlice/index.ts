import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpecializationsThunk } from './thunk';
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
    add: (state, { payload }: PayloadAction<SpecializationType>) => {
      state.data.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SpecializationsThunk.update.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(SpecializationsThunk.update.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(SpecializationsThunk.update.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(SpecializationsThunk.create.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(SpecializationsThunk.create.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(SpecializationsThunk.create.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
