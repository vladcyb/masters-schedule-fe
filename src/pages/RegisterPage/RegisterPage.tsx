import React from 'react';
import { RegisterForm } from '../../components';
import './style.css';

type PropsType = {
  isLoading: boolean
};

export const RegisterPage = ({ isLoading }: PropsType) => (
  <div className="registerPage">
    <div className="center title">Регистрация</div>
    <RegisterForm className="registerPage__form" isLoading={isLoading} />
  </div>
);
