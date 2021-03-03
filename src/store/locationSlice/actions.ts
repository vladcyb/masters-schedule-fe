import { createAction } from '@reduxjs/toolkit';
import { AddLocationPAType, DeleteLocationPAType, LocationTypeType } from './types';

const actions = {
  set: createAction<Location[]>('locations/set'),
  add: createAction<AddLocationPAType>('locations/add'),
  delete: createAction<DeleteLocationPAType>('locations/delete'),
  setTypes: createAction<LocationTypeType[]>('locations/setTypes'),
};

export default actions;
