import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { useField } from '../../shared/hooks/useField';
import { Button, Field } from '../../components';
import { useAppDispatch } from '../../store';
import { ILogin } from '../../API/interfaces';
import { getLoading } from '../../store/userSlice/selectors';
import { useSetters } from '../../shared/hooks/useSetters';
import { validateLogin } from './validate';
import './style.css';

export const Login = () => {
  /* state */
  const [isError, setIsError] = useState(false);

  /* hooks */
  const [getters, setters] = useSetters();
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getLoading);

  /* vars */
  const form: ILogin = {
    login: login.props.value,
    password: password.props.value,
    setters,
  };

  /* effects */
  useEffect(() => {
    setIsError(!validateLogin(form));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.login, form.password]);

  /* methods */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isError || isLoading) {
      return;
    }
    dispatch(UserThunk.login(form));
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} autoComplete="off">
        <Field {...login.props} label="Login:" />
        <Field {...password.props} label="Password:" />
        <Button className="login__submit" type="submit">Login</Button>
        <Link className="navlink login__register" to="/register">Register</Link>
      </form>
    </div>
  );
};
