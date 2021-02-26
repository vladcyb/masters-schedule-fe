import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import { UserRole } from '../../../API/interfaces';
import { UserDataStateType } from '../../../store/userSlice/types';
import './style.css';

type PropsType = {
  userData: UserDataStateType
  onLogout: () => void
};

export const Navbar = ({ userData, onLogout }: PropsType) => (
  <div className="navbar">
    <div>
      <NavLink className="navbar__navlink" to={routes.me.root}>Me</NavLink>
      <NavLink className="navbar__navlink" to={routes.orders.root}>My orders</NavLink>
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
    </div>
    <button className="navbar__logout" type="button" onClick={onLogout}>
      Logout
    </button>
  </div>
);
