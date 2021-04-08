import { MasterType, SpecializationType } from '../../shared/types';

export type StateType = {
  loading: boolean
  data: Array<MasterType>
};

export type SetSpecializationsPAType = {
  id: number
  specializations: SpecializationType[]
};

export type DeleteSpecializationsPAType = {
  masterId: number
  specializationId: number
};
