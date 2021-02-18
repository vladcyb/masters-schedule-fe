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

export interface ILogin {
  login: string
  password: string
}

export interface IRegister {
  login: string
  password: string
  role: UserRole
  surname: string
  name: string
  patronymic: string
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
