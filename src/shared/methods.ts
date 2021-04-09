import { MasterType } from './types';

type HasFullName = {
  surname: string
  name: string
  patronymic: string
};

export const getFullName = (somebody: HasFullName) => (
  `${somebody.surname} ${somebody.name} ${somebody.patronymic}`
);

export const sortMastersByFullName = (lhs: MasterType, rhs: MasterType) => {
  if (lhs.user.surname < rhs.user.surname) {
    return -1;
  }
  if (lhs.user.surname > rhs.user.surname) {
    return 1;
  }
  if (lhs.user.name < rhs.user.name) {
    return -1;
  }
  if (lhs.user.name > rhs.user.name) {
    return 1;
  }
  if (lhs.user.patronymic < rhs.user.patronymic) {
    return -1;
  }
  if (lhs.user.patronymic > rhs.user.patronymic) {
    return 1;
  }
  return 0;
};
