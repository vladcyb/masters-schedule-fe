import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Field } from '../../components';
import { useField, useSetters } from '../../shared/hooks';
import { getLoading } from '../../store/userSlice/selectors';
import { IRegisterForm } from '../../API/interfaces';
import { validateRegistration } from './validate';
import './style.css';

export const Register = () => {
  /* state */
  const [isValid, setIsValid] = useState(true);

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

  return (
    <form className="register" onSubmit={handleSubmit} autoComplete="off">
      <Field label="Login:" {...login.props} />
      <Field label="Password:" {...password.props} />
      <Field label="Repeat password:" {...passwordRepeat.props} />
      <Button className="register__submit" type="submit">Register</Button>
      <Link className="navlink register__login" to="/login">Login</Link>
    </form>
  );
};
