import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocationThunk from './thunk';
import { LocationTypeType, StateType } from './types';
import { LocationType } from '../../shared/types';

const initialState: StateType = {
  loading: false,
  data: [],
  error: false,
  types: [],
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<LocationType>) => {
      state.data.push(payload);
    },
    set: (state, { payload }: PayloadAction<LocationType[]>) => {
      state.data = payload;
    },
    setTypes: (state, { payload }: PayloadAction<LocationTypeType[]>) => {
      state.types = payload;
    },
    delete: (state, { payload }: PayloadAction<number>) => {
      const index = state.data.findIndex((item) => item.id === payload);
      state.data.splice(index, 1);
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
