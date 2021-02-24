import { LocationType } from '../../shared/types';

export type LocationTypeType = {
  id: number
  title: string
};

export type StateType = {
  loading: boolean
  data: LocationType[]
  error: boolean
  types: LocationTypeType[]
};
