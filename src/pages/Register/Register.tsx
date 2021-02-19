import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/authSlice/thunk';
import { Button, Field, Select } from '../../components';
import { useField, useSetters } from '../../shared/hooks';
import { getLoading } from '../../store/authSlice/selectors';
import { IRegisterForm, UserRole } from '../../API/interfaces';
import { validateRegistration } from './validate';
import { SelectOptions } from '../../components/Select/types';
import { useAppDispatch } from '../../store';
import './style.css';

const roles: SelectOptions<UserRole> = [
  { value: UserRole.CLIENT, title: 'Клиент' },
  { value: UserRole.MASTER, title: 'Мастер' },
  { value: UserRole.ADMIN, title: 'Администратор' },
  { value: UserRole.OPERATOR, title: 'Оператор' },
  { value: UserRole.RESPONSIBLE, title: 'Ответственный по мастерам' },
];

export const Register = () => {
  /* state */
  const [isValid, setIsValid] = useState(true);

  /* hooks */
  const [getters, setters] = useSetters();
  const isLoading = useSelector(getLoading);
  const dispatch = useAppDispatch();

  /* fields state */
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const passwordRepeat = useField('passwordRepeat', getters, setters);
  const surname = useField('surname', getters, setters);
  const name = useField('name', getters, setters);
  const patronymic = useField('patronymic', getters, setters);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);

  /* vars */
  const form: IRegisterForm = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
    surname: surname.props.value,
    name: name.props.value,
    patronymic: patronymic.props.value,
    role: selectedRole,
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateRegistration(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(form));

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    dispatch(UserThunk.register({
      ...form,
      setters,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as UserRole);
  };

  return (
    <form className="register" onSubmit={handleSubmit} autoComplete="off">
      <Field label="Login:" {...login.props} />
      <Field label="Password:" {...password.props} />
      <Field label="Repeat password:" {...passwordRepeat.props} />
      <Field label="Surname:" {...surname.props} />
      <Field label="Name:" {...name.props} />
      <Field label="Patronymic:" {...patronymic.props} />
      <Select
        className="register__role"
        options={roles}
        value={selectedRole}
        onChange={handleSelectChange}
      />
      <Button className="register__submit" type="submit">Register</Button>
      <Link className="navlink register__login" to="/login">Login</Link>
    </form>
  );
};
