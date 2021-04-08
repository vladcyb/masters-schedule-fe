import { createAction } from '@reduxjs/toolkit';
import { MasterType } from '../../shared/types';
import { ISpecializationDelete, SetSpecializationsPAType } from './types';

export const actions = {
  set: createAction<MasterType[]>('masterList/set'),
  setSpecializations: createAction<SetSpecializationsPAType>('masterList/setSpecializations'),
  deleteSpecialization: createAction<ISpecializationDelete>(
    'masterList/deleteSpecialization',
  ),
};
