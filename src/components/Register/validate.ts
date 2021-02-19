import { IRegisterForm } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

export const validateRegistration = (form: IRegisterForm, setters: Setters): boolean => {
  const { setErrors } = setters;
  const errors: any = {}; // TODO: затипизировать
  const {
    login, password, passwordRepeat, name, surname, patronymic, locationId, specializationId,
  } = form;
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
  if (!name.trim()) {
    errors.name = 'Enter name!';
  }
  if (!surname.trim()) {
    errors.surname = 'Enter surname!';
  }
  if (!patronymic.trim()) {
    errors.patronymic = 'Enter patronymic!';
  }
  if (!specializationId) {
    errors.specializationId = 'Select specialization!';
  }
  if (!locationId) {
    errors.locationId = 'Select location!';
  }
  setErrors(errors);
  return !Object.keys(errors).length;
};
