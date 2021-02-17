import React from 'react';
import { useField } from '../../shared/hooks/useField';
import { Field } from '../../components/Field';
import './style.css';

export const Login = () => {
  /* hooks */
  const login = useField();
  const password = useField();

  /* methods */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(login.props.value);
    console.log(password.props.value);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} autoComplete="off">
        <Field {...login.props} />
        <Field {...password.props} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
