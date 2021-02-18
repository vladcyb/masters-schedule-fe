import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Field, Select } from '../../components';
import { useField, useSetters } from '../../shared/hooks';
import { getLoading } from '../../store/authSlice/selectors';
import { IRegisterForm, UserRole } from '../../API/interfaces';
import { validateRegistration } from './validate';
import { SelectOptions } from '../../components/Select/types';
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
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);

  /* hooks */
  const [getters, setters] = useSetters();
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const passwordRepeat = useField('passwordRepeat', getters, setters);
  const isLoading = useSelector(getLoading);

  /* vars */
  const form: IRegisterForm = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateRegistration(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.login, form.password, form.passwordRepeat]);

  /* vars */
  const formData = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
  };

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    console.log(formData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as UserRole);
  };

  return (
    <form className="register" onSubmit={handleSubmit} autoComplete="off">
      <Field label="Login:" {...login.props} />
      <Field label="Password:" {...password.props} />
      <Field label="Repeat password:" {...passwordRepeat.props} />
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
