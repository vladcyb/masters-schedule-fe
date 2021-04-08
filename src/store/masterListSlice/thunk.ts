import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { actions } from './actions';
import { ISpecializationDelete } from './types';

export const MasterListThunk = {
  update: createAsyncThunk(
    'masterList/update',
    async (arg, { dispatch }) => {
      const { data: { ok, result } } = await API.Master.getAll();
      if (ok) {
        dispatch(actions.set(result));
      }
    },
  ),
  deleteSpecialization: createAsyncThunk(
    'masterList/deleteSpecialization',
    async (props: ISpecializationDelete, { dispatch }) => {
      const { data: { ok } } = await API.Master.deleteSpecialization(
        props.masterId,
        props.specializationId,
      );
      if (ok) {
        dispatch(actions.deleteSpecialization(props));
      }
    },
  ),
};
