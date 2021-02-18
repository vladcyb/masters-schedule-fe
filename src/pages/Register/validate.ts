import { IRegisterForm } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateRegistration = (form: IRegisterForm, setters: Setters): boolean => {
  const { setErrors } = setters;
  const { login, password, passwordRepeat } = form;
  if (!login) {
    setErrors({ login: 'Enter login!' });
    return false;
  }
  if (!login[0].match(/[a-zA-Z]/) || !login.match(/^[A-Za-z0-9]*$/)) {
    setErrors({
      login: 'Login must begin with a letter and contain only Latin letters and numbers!',
    });
    return false;
  }
  if (!password) {
    setErrors({ password: 'Enter password!' });
    return false;
  }
  if (password.length < 8) {
    setErrors({ password: 'Password must contain at least 8 characters!' });
    return false;
  }
  if (!passwordRepeat) {
    setErrors({ passwordRepeat: 'Repeat password!' });
    return false;
  }
  if (password !== passwordRepeat) {
    setErrors({ passwordRepeat: 'Passwords mismatch!' });
    return false;
  }
  setErrors({});
  return true;
};
