export enum UserRole {
  MASTER = 'MASTER',
  CLIENT = 'CLIENT',
  OPERATOR = 'OPERATOR',
  ADMIN = 'ADMIN',
  RESPONSIBLE = 'RESPONSIBLE',
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
