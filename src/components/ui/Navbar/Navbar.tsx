import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import './style.css';

export const Navbar = () => (
  <div className="navbar">
    <NavLink className="navbar__navlink" to={routes.me.root}>Me</NavLink>
    <NavLink className="navbar__navlink" to={routes.orders.root}>Orders</NavLink>
  </div>
);
