import { createAction } from '@reduxjs/toolkit';
import { LocationTypeType } from './types';

const actions = {
  set: createAction<Location[]>('locations/set'),
  add: createAction<Location>('locations/add'),
  delete: createAction<number>('locations/delete'),
  setTypes: createAction<LocationTypeType[]>('locations/setTypes'),
};

export default actions;
