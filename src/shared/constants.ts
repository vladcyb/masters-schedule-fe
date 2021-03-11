import { SelectOptionType } from '../components/ui';
import { UserRole } from '../API/interfaces';
import { RolesPermissions } from './types';
import { routes } from './routes';

export const ROLES: SelectOptionType[] = [
  { value: UserRole.CLIENT, title: 'Клиент' },
  { value: UserRole.MASTER, title: 'Мастер' },
  { value: UserRole.ADMIN, title: 'Администратор' },
  { value: UserRole.OPERATOR, title: 'Оператор' },
  { value: UserRole.RESPONSIBLE, title: 'Ответственный по мастерам' },
];

export const rolesPermissions: RolesPermissions = {
  [UserRole.CLIENT]: [
    routes.orders.root,
  ],
  [UserRole.MASTER]: [
    routes.orders.root,
    routes.schedule.root,
  ],
  [UserRole.OPERATOR]: [
    routes.orders.root,
    routes.schedule.root,
  ],
  [UserRole.RESPONSIBLE]: [

  ],
  [UserRole.ADMIN]: [
    routes.orders.root,
    routes.schedule.root,
    routes.administration.root,
  ],
};

export const allowedImageFormats = [
  'image/svg',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
];
