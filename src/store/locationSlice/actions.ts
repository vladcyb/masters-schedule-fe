import { createAction } from '@reduxjs/toolkit';

const actions = {
  set: createAction<Location[]>('locations/set'),
};

export default actions;
