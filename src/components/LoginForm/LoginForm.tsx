import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCn } from 'bem-react-classname';
import { thunks } from '../../store/thunks';
import { useField, useSetters } from '../../shared/hooks';
import {
  Spinner, Button, Field, Form,
} from '../ui';
import { useAppDispatch } from '../../store';
import { validateLogin } from './validate';
import { ILoginForm } from '../../API/interfaces';
import { routes } from '../../shared/routes';
import './style.css';

type PropsType = {
  className?: string
  isLoading: boolean
};

export const LoginForm = ({ className, isLoading }: PropsType) => {
  /* classes */
  const cn = createCn('loginForm', className);

  /* state */
  const [isValid, setIsValid] = useState(false);

  /* hooks */
  const [getters, setters] = useSetters();
  const login = useField('login', getters, setters);
  const password = useField('password', getters, setters);
  const dispatch = useAppDispatch();

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
    dispatch(thunks.user.login({ ...form, setters }));
  };

  return (
    <Form className={cn()} onSubmit={handleSubmit}>
      <Field {...login.props} label="Логин:" />
      <Field {...password.props} label="Пароль:" type="password" />
      <Button className={cn('submit')} type="submit">Войти</Button>
      <Link className={cn('register navlink')} to={routes.register.root}>
        Регистрация
      </Link>
      <Spinner className={cn('spinner')} visible={isLoading} />
    </Form>
  );
};
