import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import { UserRole } from '../../../API/interfaces';
import { UserDataStateType } from '../../../store/userSlice/types';
import './style.css';

type PropsType = {
  userData: UserDataStateType
};

export const Navbar = ({ userData }: PropsType) => (
  <div className="navbar">
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
);
