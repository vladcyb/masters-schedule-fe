import { createAction } from '@reduxjs/toolkit';
import { StateType } from './types';
import { SpecializationType } from '../../shared/types';

const actions = {
  set: createAction<StateType>('specializations/set'),
  add: createAction<SpecializationType>('specializations/add'),
};

export default actions;
