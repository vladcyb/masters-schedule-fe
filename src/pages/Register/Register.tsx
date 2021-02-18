import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Field } from '../../components';
import './style.css';

export const Register = () => {
  console.log(123);
  return (
    <div className="register">
      <Field label="Login:" name="login" />
      <Field label="Password:" name="password" />
      <Field label="Repeat password:" name="repeatedPassword" />
      <Button className="register__submit">Register</Button>
      <Link className="navlink register__login" to="/login">Login</Link>
    </div>
  );
};
