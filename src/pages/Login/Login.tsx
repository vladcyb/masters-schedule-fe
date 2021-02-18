import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { useField } from '../../shared/hooks/useField';
import { Button, Field } from '../../components';
import { useAppDispatch } from '../../store';
import { ILogin } from '../../API/interfaces';
import { getLoading } from '../../store/userSlice/selectors';
import './style.css';

export const Login = () => {
  /* hooks */
  const login = useField();
  const password = useField();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getLoading);

  /* vars */
  const formData: ILogin = {
    login: login.props.value,
    password: password.props.value,
  };

  /* methods */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.login || !formData.password || isLoading) {
      return;
    }
    dispatch(UserThunk.login(formData));
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} autoComplete="off">
        <Field {...login.props} label="Login:" name="login" />
        <Field {...password.props} label="Password:" name="password" />
        <Button className="login__submit" type="submit">Login</Button>
        <Link className="navlink login__register" to="/register">Register</Link>
      </form>
    </div>
  );
};
