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

export const Navbar = ({ userData, onLogout }: PropsType) => {
  /* state */
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  /* methods */
  const toggleUserMenu = () => {
    setIsUserMenuOpened((value) => !value);
  };

  return (
    <div className="navbar">
      <div className="navbar__main">
        <NavLink className="navbar__navlink" to={routes.me.root}>Me</NavLink>
        {userData.role === UserRole.CLIENT && (
          <NavLink className="navbar__navlink" to={routes.orders.root}>My orders</NavLink>
        )}
        {userData.role === UserRole.ADMIN && (
          <>
            <NavLink className="navbar__navlink" to={routes.locations.root}>
              Locations
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.services.root}>
              Services
            </NavLink>
            <NavLink className="navbar__navlink" to={routes.specializations.root}>
              Specializations
            </NavLink>
          </>
        )}
        {userData.role === UserRole.MASTER && (
          <NavLink className="navbar__navlink" to={routes.schedule.root}>
            My schedule
          </NavLink>
        )}
        {userData.role === UserRole.OPERATOR && (
          <NavLink className="navbar__navlink" to={routes.manageOrders.root}>
            Orders
          </NavLink>
        )}
      </div>
      <div className={`navbar__userMenuWrapper 
        ${isUserMenuOpened ? 'navbar__userMenuWrapper_opened' : ''}`}
      >
        <button className="navbar__navlink navbar__toggle" type="button" onClick={toggleUserMenu}>
          {userData.login}
          <img className="navbar__userMenuArrow" alt="" />
        </button>
        <div className="navbar__userMenu">
          <button type="button" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};
