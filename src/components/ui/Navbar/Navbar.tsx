import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import { UserRole } from '../../../API/interfaces';
import { UserDataStateType } from '../../../store/userSlice/types';
import './style.css';

type PropsType = {
  user: UserDataStateType
};

export const Navbar = ({ user }: PropsType) => (
  <div className="navbar">
    <NavLink className="navbar__navlink" to={routes.me.root}>Me</NavLink>
    <NavLink className="navbar__navlink" to={routes.orders.root}>Orders</NavLink>
    {user.role === UserRole.ADMIN && (
      <NavLink className="navbar__navlink" to={routes.locations.root}>Locations</NavLink>
    )}
  </div>
);
