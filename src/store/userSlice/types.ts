import { UserRole } from '../../API/interfaces';
import { OrderType } from '../../shared/types';

export type UserDataStateType = {
  login: string | undefined
  id: number | undefined
  surname: string | undefined
  name: string | undefined
  patronymic: string | undefined
  role: UserRole | undefined
};

export type StateType = {
  loading: boolean
  fetched: boolean
  data: UserDataStateType
  orders: {
    loading: boolean
    data: OrderType[]
  },
};
