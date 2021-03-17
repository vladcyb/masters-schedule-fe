import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui';
import { routes } from '../../shared/routes';
import './style.css';

export const AdministrationPage = () => (
  <Container className="administrationPage">
    <div className="title">Администрирование</div>
    <ul className="administrationPage__navigation">
      <li>
        <Link className="navlink" to={routes.administration.locations.root}>
          Местоположения
        </Link>
      </li>
      <li>
        <Link className="navlink" to={routes.administration.specializations.root}>
          Специализации
        </Link>
      </li>
      <li>
        <Link className="navlink" to={routes.administration.services.root}>
          Услуги
        </Link>
      </li>
    </ul>
  </Container>
);
