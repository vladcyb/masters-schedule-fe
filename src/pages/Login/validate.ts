import { ILogin } from '../../API/interfaces';

export const validateLogin = (form: ILogin): boolean => {
  const { setErrors } = form.setters;
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
