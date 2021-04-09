import { createAction } from '@reduxjs/toolkit';
import { MasterType } from '../../shared/types';
import { AddSpecializationPAType, ISpecializationDelete, SetSpecializationsPAType } from './types';

export const actions = {
  set: createAction<MasterType[]>('masterList/set'),
  setSpecializations: createAction<SetSpecializationsPAType>('masterList/setSpecializations'),
  deleteSpecialization: createAction<ISpecializationDelete>(
    'masterList/deleteSpecialization',
  ),
  addSpecialization: createAction<AddSpecializationPAType>(
    'masterList/addSpecialization',
  ),
};
