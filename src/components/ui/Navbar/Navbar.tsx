import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import { RolesMap } from '../../../shared/types';
import './style.css';

type PropsType = {
  login: string
  rolesMap: RolesMap
  onLogout: () => void
};

export const Navbar = ({ rolesMap, login, onLogout }: PropsType) => {
  /* state */
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  /* methods */
  const toggleUserMenu = () => {
    setIsUserMenuOpened((value) => !value);
  };

  return (
    <div className="navbar">
      <div className="navbar__main">

        <NavLink className="navbar__navlink" to={routes.me.root}>
          Моя страница
        </NavLink>

        {/* Клиент */}
        {rolesMap.isClient && (
          <NavLink className="navbar__navlink" to={routes.orders.root}>
            Мои заказы
          </NavLink>
        )}

        {/* Мастер */}
        {rolesMap.isMaster && (
          <>
            <NavLink className="navbar__navlink" to={routes.orders.root}>
              Мои заказы
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.master.schedule.root}>
              Мое расписание
            </NavLink>
          </>
        )}

        {/* Оператор */}
        {rolesMap.isOperator && (
          <>
            <NavLink className="navbar__navlink" to={routes.orders.root}>
              Заказы
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.administration.schedule.root}>
              Расписание
            </NavLink>
          </>
        )}

        {/* Администратор */}
        {rolesMap.isAdmin && (
          <>
            <NavLink className="navbar__navlink" to={routes.orders.root}>
              Заказы
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.administration.root}>
              Администрирование
            </NavLink>
          </>
        )}

        {/* Ответственный */}
        {rolesMap.isResponsible && (
          <>
            <NavLink className="navbar__navlink" to={routes.responsible.masters.root}>
              Мастера
            </NavLink>
          </>
        )}

      </div>

      {/* Выпадающее меню */}
      <div className={`navbar__userMenuWrapper ${isUserMenuOpened
        ? 'navbar__userMenuWrapper_opened'
        : ''}`}
      >
        <button className="navbar__navlink navbar__toggle" type="button" onClick={toggleUserMenu}>
          {login}
          <img className="navbar__userMenuArrow" alt="" />
        </button>
        <div className="navbar__userMenu">
          <button type="button" onClick={onLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
