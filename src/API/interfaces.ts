import { Setters } from '../shared/hooks/useSetters/types';

export enum UserRole {
  MASTER = 'MASTER',
  CLIENT = 'CLIENT',
  OPERATOR = 'OPERATOR',
  ADMIN = 'ADMIN',
  RESPONSIBLE = 'RESPONSIBLE',
}

export enum OrderStatus {
  PENDING,
  IN_PROGRESS,
  DONE,
  ABORTED,
  ON_REWORK,
  PENDING_FOR_ACCEPTING,
}

export interface ILoginForm {
  login: string
  password: string
}

export interface IRegisterForm {
  login: string
  password: string
  passwordRepeat: string
  role: UserRole
  surname: string
  name: string
  patronymic: string
  specializationId?: number
  locationId?: number
}

export interface ILoginAPI extends ILoginForm {
  setters: Setters
}

export interface IRegisterAPI extends IRegisterForm {
  setters: Setters
}

export interface IOrderCreate {
  description: string
  address: string
  photo: string
  service?: number
}

export interface IOrderSetStatus {
  id: number
  status: OrderStatus
}

export interface ILocationCreate {
  title: string
  coordinates: string
  typeId: number
  parentId: number
}

export interface ISpecializationCreate {
  title: string
  icon: string
}

export interface IServiceCreate {
  title: string
  price: string
  duration: number
  specializationId: number
}

export interface IMasterSetSchedule {
  hours: string
}
