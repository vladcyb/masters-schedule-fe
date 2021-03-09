import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../shared/routes';
import { Container } from '../../components/ui';
import warning from '../../assets/img/warning.svg';
import './style.css';

export const SomethingWentWrongPage = () => (
  <Container className="SomethingWentWrongPage">
    <img className="SomethingWentWrongPage__warn" src={warning} alt="warning" />
    <h1 className="SomethingWentWrongPage__header">Что-то пошло не так!</h1>
    <Link className="SomethingWentWrongPage__link navlink" to={routes.me.root}>На главную</Link>
  </Container>
);
