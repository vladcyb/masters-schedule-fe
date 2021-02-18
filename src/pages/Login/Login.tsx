import React from 'react';
import { useField } from '../../shared/hooks/useField';
import { Field } from '../../components/Field';
import './style.css';
import UserThunk from '../../store/userSlice/thunk';
import { useAppDispatch } from '../../store';
import { ILogin } from '../../API/interfaces';

export const Login = () => {
  /* hooks */
  const login = useField();
  const password = useField();
  const dispatch = useAppDispatch();

  /* vars */
  const formData: ILogin = {
    login: login.props.value,
    password: password.props.value,
  };

  /* methods */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.login || !formData.password) {
      return;
    }
    dispatch(UserThunk.login(formData));
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} autoComplete="off">
        <Field {...login.props} label="Login:" name="login" />
        <Field {...password.props} label="Password:" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
