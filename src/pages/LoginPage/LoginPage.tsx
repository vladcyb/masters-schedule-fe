import React from 'react';
import { LoginForm } from '../../components';
import './style.css';

type PropsType = {
  isLoading: boolean
};

export const LoginPage = ({ isLoading }: PropsType) => (
  <div className="loginPage">
    <div className="title center">Вход</div>
    <LoginForm className="loginPage__form" isLoading={isLoading} />
  </div>
);
