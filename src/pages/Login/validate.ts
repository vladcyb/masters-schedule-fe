import { ILoginForm } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateLogin = (form: ILoginForm, setters: Setters): boolean => {
  const errors: Partial<ILoginForm> = {};
  if (!form.login) {
    errors.login = 'Enter login!';
  }
  if (!form.password) {
    errors.password = 'Enter password!';
  }
  setters.setErrors(errors);
  return !Object.keys(errors).length;
};
