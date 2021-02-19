import { createAction } from '@reduxjs/toolkit';

export const actions = {
  set: createAction<Location[]>('locations/set'),
};
