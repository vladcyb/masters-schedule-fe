import { SelectOptionType } from '../components/ui';
import { UserRole } from '../API/interfaces';

export const ROLES: SelectOptionType[] = [
  { value: UserRole.CLIENT, title: 'Клиент' },
  { value: UserRole.MASTER, title: 'Мастер' },
  { value: UserRole.ADMIN, title: 'Администратор' },
  { value: UserRole.OPERATOR, title: 'Оператор' },
  { value: UserRole.RESPONSIBLE, title: 'Ответственный по мастерам' },
];

export const allowedImageFormats = [
  'image/svg',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const dateFormat = 'yyyy-MM-dd';

export const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
