import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCn } from 'bem-react-classname';
import { useSelector } from 'react-redux';
import AuthThunk from '../../store/authSlice/thunk';
import { useField, useSetters } from '../../shared/hooks';
import { Spinner, Button, Field } from '../ui';
import { useAppDispatch } from '../../store';
import { getLoading } from '../../store/authSlice/selectors';
import { validateLogin } from './validate';
import { ILoginForm } from '../../API/interfaces';
import './style.css';

type PropsType = {
  className?: string
};

export const Login = ({ className }: PropsType) => {
  /* classes */
  const cn = createCn('loginForm', className);

  /* state */
  const [isValid, setIsValid] = useState(false);

  /* hooks */
  const [getters, setters] = useSetters();
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getLoading);

  /* vars */
  const form: ILoginForm = {
    login: login.props.value,
    password: password.props.value,
  };

  /* effects */
  useEffect(() => {
    setIsValid(validateLogin(form, setters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.login, form.password]);

  /* methods */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setters.setIsSubmitted(true);
    if (!isValid || isLoading) {
      return;
    }
    dispatch(AuthThunk.login({ ...form, setters }));
  };

  return (
    <form className={cn()} onSubmit={handleSubmit} autoComplete="off">
      <Field {...login.props} label="Login:" />
      <Field {...password.props} label="Password:" />
      <Button className={cn('submit')} type="submit">Login</Button>
      <Link className={cn('register navlink')} to="/register">Register</Link>
      <Spinner className={cn('spinner')} visible={isLoading} />
    </form>
  );
};
