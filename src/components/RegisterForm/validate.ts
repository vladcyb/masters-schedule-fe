import { IRegisterForm, UserRole } from '../../API/interfaces';
import { Setters } from '../../shared/hooks/useSetters/types';

type Errors = {
  login?: string
  password?: string
  passwordRepeat?: string
  role?: string
  surname?: string
  name?: string
  patronymic?: string
  specializationId?: string
  locationId?: string
};

export const validateRegistration = (form: IRegisterForm, setters: Setters): boolean => {
  const { setErrors } = setters;
  const errors: Errors = {};
  const {
    login, password, passwordRepeat, name, surname, patronymic, locationId, specializationId, role,
  } = form;
  if (!login) {
    errors.login = 'Введите логин!';
  } else if (!login[0].match(/[a-zA-Z]/) || !login.match(/^[A-Za-z0-9]*$/)) {
    errors.login = 'Логин должен начинаться с буквы и содержать только латинские буквы и цифры!';
  }
  if (!password) {
    errors.password = 'Введите пароль!';
  } else if (password.length < 8) {
    errors.password = 'Пароль должен содержать как минимум 8 символов!';
  }
  if (!passwordRepeat) {
    errors.passwordRepeat = 'Повторите пароль!';
  } else if (password !== passwordRepeat) {
    errors.passwordRepeat = 'Пароли не совпадают!';
  }
  if (!name.trim()) {
    errors.name = 'Введите имя!';
  }
  if (!surname.trim()) {
    errors.surname = 'Введите фамилию!';
  }
  if (!patronymic.trim()) {
    errors.patronymic = 'Введите отчество!';
  }
  if (role === UserRole.MASTER) {
    if (!specializationId) {
      errors.specializationId = 'Выберите специализацию!';
    }
    if (!locationId) {
      errors.locationId = 'Выберите местоположение!';
    }
  }
  setErrors(errors);
  return !Object.keys(errors).length;
};
