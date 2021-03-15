import { createAction } from '@reduxjs/toolkit';
import { ServiceType } from '../../shared/types';

export const actions = {
  set: createAction<ServiceType[]>('services/set'),
  add: createAction<ServiceType>('services/add'),
};
