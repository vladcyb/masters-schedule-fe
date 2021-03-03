import { LocationType } from '../../shared/types';

export type LocationTypeType = {
  id: number
  title: string
};

export type AddLocationPAType = {
  parentId: number
} & LocationType;

export type DeleteLocationPAType = {
  id: number
  parentId: number
};

export type StateType = {
  loading: boolean
  data: LocationType[]
  error: boolean
  types: LocationTypeType[]
};
