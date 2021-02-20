import { SelectOptionType } from '../components/ui';
import { UserRole } from '../API/interfaces';

export const ROLES: SelectOptionType[] = [
  { value: UserRole.CLIENT, title: 'Client' },
  { value: UserRole.MASTER, title: 'Master' },
  { value: UserRole.ADMIN, title: 'Administrator' },
  { value: UserRole.OPERATOR, title: 'Operator' },
  { value: UserRole.RESPONSIBLE, title: 'Responsible' },
];
