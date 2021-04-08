import { createAction } from '@reduxjs/toolkit';
import { MasterType } from '../../shared/types';
import { SetSpecializationsPAType } from './types';

export const actions = {
  set: createAction<MasterType[]>('masterList/set'),
  setSpecializations: createAction<SetSpecializationsPAType>('masterList/setSpecializations'),
};
