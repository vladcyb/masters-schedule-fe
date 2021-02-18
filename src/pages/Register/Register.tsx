import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Field } from '../../components';
import { useField } from '../../shared/hooks/useField';
import './style.css';
import { useSetters } from '../../shared/hooks/useSetters';

export const Register = () => {
  /* hooks */
  const [getters, setters] = useSetters();
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const passwordRepeat = useField('passwordRepeat', getters, setters);

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
      <Field label="Login:" {...login.props} />
      <Field label="Password:" {...password.props} />
      <Field label="Repeat password:" {...passwordRepeat.props} />
      <Button className="register__submit" type="submit">Register</Button>
      <Link className="navlink register__login" to="/login">Login</Link>
    </form>
  );
};
