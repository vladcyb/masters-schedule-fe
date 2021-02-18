import { ILoginForm } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateLogin = (form: ILoginForm, setters: Setters): boolean => {
  const { setErrors } = setters;
  if (!form.login) {
    setErrors({ login: 'Enter login!' });
    return false;
  }
  if (!form.password) {
    setErrors({ password: 'Enter password!' });
    return false;
  }
  return true;
};
