import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Field } from '../../components';
import './style.css';
import { useField } from '../../shared/hooks/useField';

export const Register = () => {
  /* hooks */
  const login = useField();
  const password = useField();
  const passwordRepeat = useField();

  /* vars */
  const formData = {
    login: login.props.value,
    password: password.props.value,
    passwordRepeat: passwordRepeat.props.value,
  };

  /* methods */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="register" onSubmit={handleSubmit} autoComplete="off">
      <Field label="Login:" name="login" {...login.props} />
      <Field label="Password:" name="password" {...password.props} />
      <Field label="Repeat password:" name="repeatedPassword" {...passwordRepeat.props} />
      <Button className="register__submit" type="submit">Register</Button>
      <Link className="navlink register__login" to="/login">Login</Link>
    </form>
  );
};
