import React from 'react';
import { RegisterForm } from '../../components';
import './style.css';

export const RegisterPage = () => (
  <div className="registerPage">
    <div className="center title">Register</div>
    <RegisterForm className="registerPage__form" />
  </div>
);
