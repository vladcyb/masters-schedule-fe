import { createAction } from '@reduxjs/toolkit';
import { LocationTypeType } from './types';

const actions = {
  set: createAction<Location[]>('locations/set'),
  add: createAction<Location>('locations/add'),
  setTypes: createAction<LocationTypeType[]>('locations/setTypes'),
};

export default actions;
