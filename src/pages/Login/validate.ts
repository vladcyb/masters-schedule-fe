import { ILogin } from '../../API/interfaces';

export const validateLogin = (form: ILogin): boolean => {
  if (!form.login) {
    form.setters.setErrors({ login: 'Enter login!' });
    return false;
  }
  if (!form.password) {
    form.setters.setErrors({ password: 'Enter password!' });
    return false;
  }
  return true;
};
