import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddSpecializationPAType, ISpecializationDelete, SetSpecializationsPAType, StateType,
} from './types';
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
    deleteSpecialization: (state, { payload }: PayloadAction<ISpecializationDelete>) => {
      const master = state.data.find((item) => item.id === payload.masterId);
      if (master) {
        const index = master.specializations.findIndex((item) => (
          item.id === payload.specializationId
        ));
        if (index !== -1) {
          master.specializations.splice(index, 1);
        }
      }
    },
    addSpecialization: (state, { payload }: PayloadAction<AddSpecializationPAType>) => {
      const master = state.data.find((item) => item.id === payload.masterId);
      if (master && master.specializations.every((spec) => spec.id !== payload.specialization.id)) {
        master.specializations.push(payload.specialization);
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
