import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../../../shared/routes';
import { getUserData } from '../../../store/userSlice/selectors';
import './style.css';
import { UserRole } from '../../../API/interfaces';

export const Navbar = () => {
  const user = useSelector(getUserData);

  return (
    <div className="navbar">
      <NavLink className="navbar__navlink" to={routes.me.root}>Me</NavLink>
      <NavLink className="navbar__navlink" to={routes.orders.root}>Orders</NavLink>
      {user.role === UserRole.ADMIN && (
        <NavLink className="navbar__navlink" to={routes.locations.root}>Locations</NavLink>
      )}
    </div>
  );
};
