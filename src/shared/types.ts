import { UserRole } from '../API/interfaces';

export type SpecializationType = {
  id: number
  title: string
  icon: string
};

export type LocationType = {
  id: number
  title: string
  coordinates: string
  typeId: number
  children: LocationType[]
};

export type ServiceType = {
  id: number
  title: string
  duration: number
  price: string
  specialization: SpecializationType
};

export enum OrderStatus {
  PENDING,
  IN_PROGRESS,
  DONE,
  ABORTED,
  ON_REWORK,
  PENDING_FOR_ACCEPTING,
  DENIED,
}

export type OrderType = {
  id: number
  description: string
  startDate: string | null
  finishDate: string | null
  status: OrderStatus
  comment: string | null
  photo: string
  address: string
  services: Partial<ServiceType[]>
  master: {
    id: number
  }
  price: number
};

export type RolesMap = {
  isClient: boolean
  isMaster: boolean
  isOperator: boolean
  isAdmin: boolean
  isResponsible: boolean
};

export type MasterType = {
  id: number
  user: {
    id: 26,
    login: string
    surname: string
    name: string
    patronymic: string
    role: UserRole
  }
  location: {
    id: number
    title: string
    coordinates: string,
    typeId: number
  }
  specializations: SpecializationType[]
};
