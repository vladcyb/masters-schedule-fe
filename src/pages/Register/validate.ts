import { IRegisterForm } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateRegistration = (form: IRegisterForm, setters: Setters): boolean => {
  const { setErrors } = setters;
  const errors: Partial<IRegisterForm> = {};
  const { login, password, passwordRepeat } = form;
  if (!login) {
    errors.login = 'Enter login!';
  } else if (!login[0].match(/[a-zA-Z]/) || !login.match(/^[A-Za-z0-9]*$/)) {
    errors.login = 'Login must begin with a letter and contain only Latin letters and numbers!';
  }
  if (!password) {
    errors.password = 'Enter password!';
  } else if (password.length < 8) {
    errors.password = 'Password must contain at least 8 characters!';
  }
  if (!passwordRepeat) {
    errors.passwordRepeat = 'Repeat password!';
  } else if (password !== passwordRepeat) {
    errors.passwordRepeat = 'Passwords mismatch!';
  }
  setErrors(errors);
  return !Object.keys(errors).length;
};
