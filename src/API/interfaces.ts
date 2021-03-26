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
  specializationIds?: number[]
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
}

export interface IOrderSetStatus {
  id: number
  status: OrderStatus
}

export interface IOrderSetStartDate {
  id: number
  date: string
}

export interface IOrderSetServices {
  id: number
  services: number[]
}

export interface IOrderSetMaster {
  id: number
  masterId: number
}

export interface ILocationCreate {
  title: string
  coordinates: string
  typeId: number
  parentId?: number
}

export interface ILocationEdit {
  id: number
  title?: string
  coordinates?: string
  typeId?: number
}

export interface ISpecializationCreate {
  title: string
  icon: string
}

export interface IServiceCreate {
  title: string
  price: number
  duration: number
  specializationId: number
}

export interface IMasterSetSchedule {
  hours: string
}
