import { createAction } from '@reduxjs/toolkit';
import { AddLocationPAType, DeleteLocationPAType, LocationTypeType } from './types';
import { ILocationEdit } from '../../API/interfaces';

export const actions = {
  set: createAction<Location[]>('locations/set'),
  add: createAction<AddLocationPAType>('locations/add'),
  delete: createAction<DeleteLocationPAType>('locations/delete'),
  setTypes: createAction<LocationTypeType[]>('locations/setTypes'),
  updateOne: createAction<ILocationEdit>('locations/updateOne'),
};
