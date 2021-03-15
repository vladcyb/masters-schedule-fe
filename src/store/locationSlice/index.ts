import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationThunk } from './thunk';
import {
  AddLocationPAType, DeleteLocationPAType, LocationTypeType, StateType,
} from './types';
import { LocationType } from '../../shared/types';
import { getLocationById } from './methods';
import { ILocationEdit } from '../../API/interfaces';
import { actions as userActions } from '../userSlice/actions';

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
    add: (state, { payload }: PayloadAction<AddLocationPAType>) => {
      const { parentId, ...data } = payload;
      const parent = getLocationById(state.data, 0, payload.parentId);
      if (parent) {
        parent.children.push(data);
      } else {
        state.data.push(data);
      }
    },
    set: (state, { payload }: PayloadAction<LocationType[]>) => {
      state.data = payload;
    },
    setTypes: (state, { payload }: PayloadAction<LocationTypeType[]>) => {
      state.types = payload;
    },
    delete: (state, { payload }: PayloadAction<DeleteLocationPAType>) => {
      const parent = getLocationById(state.data, 0, payload.parentId);
      if (parent) {
        const index = parent.children.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          parent.children.splice(index, 1);
        }
      } else {
        const index = state.data.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      }
    },
    updateOne: (state, { payload }: PayloadAction<ILocationEdit>) => {
      const location = getLocationById(state.data, 0, payload.id);
      if (location) {
        location.title = payload.title!;
      }
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
      })
      .addCase(LocationThunk.create.pending, (state) => {
        state.loading = true;
      })
      .addCase(LocationThunk.create.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(LocationThunk.create.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userActions.logout, () => initialState);
  },
});
