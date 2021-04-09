import { MasterType, SpecializationType } from '../../shared/types';

export type StateType = {
  loading: boolean
  data: Array<MasterType>
};

export type SetSpecializationsPAType = {
  id: number
  specializations: SpecializationType[]
};

export interface ISpecializationDelete {
  masterId: number
  specializationId: number
}

export type AddSpecializationPAType = {
  masterId: number
  specialization: SpecializationType
};
