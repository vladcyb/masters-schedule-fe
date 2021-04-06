import React from 'react';
import { Link } from 'react-router-dom';
import forbidden from '../../assets/img/forbidden.svg';
import './style.css';

export const ForbiddenPage = () => (
  <div className="forbiddenPage">
    {/* eslint-disable-next-line max-len */}
    <img className="forbiddenPage__img" src={forbidden} alt="" width="200" height="200" />
    <div className="forbiddenPage__text">
      У вас недостаточно прав для просмотра этой страницы!
    </div>
    <div>
      <Link className="navlink" to="/">На главную</Link>
    </div>
  </div>
);
