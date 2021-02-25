import React from 'react';
import { LoginForm } from '../../components';
import './style.css';

export const LoginPage = () => (
  <div className="loginPage">
    <div className="title center">Login</div>
    <LoginForm className="loginPage__form" />
  </div>
);
