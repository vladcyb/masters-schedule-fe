import { createAction } from '@reduxjs/toolkit';
import { ServiceType } from '../../shared/types';

const actions = {
  set: createAction<ServiceType[]>('services/set'),
};

export default actions;
