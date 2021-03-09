import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import { UserRole } from '../../../API/interfaces';
import { UserDataStateType } from '../../../store/userSlice/types';
import './style.css';

type PropsType = {
  userData: UserDataStateType
  onLogout: () => void
};

export const Navbar = ({ userData: { login, role }, onLogout }: PropsType) => {
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
        {role === UserRole.CLIENT && (
          <NavLink className="navbar__navlink" to={routes.orders.root}>
            Мои заказы
          </NavLink>
        )}
        {role === UserRole.ADMIN && (
          <>
            <NavLink className="navbar__navlink" to={routes.locations.root}>
              Места
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.services.root}>
              Услуги
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.specializations.root}>
              Специализации
            </NavLink>
          </>
        )}
        {role === UserRole.MASTER && (
          <NavLink className="navbar__navlink" to={routes.schedule.root}>
            Мое расписание
          </NavLink>
        )}
        {role === UserRole.OPERATOR && (
          <NavLink className="navbar__navlink" to={routes.manageOrders.root}>
            Мои заказы
          </NavLink>
        )}
      </div>
      <div className={`navbar__userMenuWrapper 
        ${isUserMenuOpened ? 'navbar__userMenuWrapper_opened' : ''}`}
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
