import { createAction } from '@reduxjs/toolkit';
import { MasterType } from '../../shared/types';

export const actions = {
  set: createAction<MasterType[]>('masterList/set'),
};
