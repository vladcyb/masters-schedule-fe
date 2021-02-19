import { createAction } from '@reduxjs/toolkit';
import { StateType } from './types';

const actions = {
  set: createAction<StateType>('specializations/set'),
};

export default actions;
