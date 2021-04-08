import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetSpecializationsPAType, StateType } from './types';
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
    setSpecializations: (state, { payload }: PayloadAction<SetSpecializationsPAType>) => {
      const found = state.data.find((master) => master.id === payload.id);
      if (found) {
        found.specializations = payload.specializations;
      }
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
