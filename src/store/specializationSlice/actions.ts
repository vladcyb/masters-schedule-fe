import { createAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import { SpecializationType } from '../../shared/types';

export const actions = {
  set: createAction<StateType>('specializations/set'),
  add: createAction<SpecializationType>('specializations/add'),
};
