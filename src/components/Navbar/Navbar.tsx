import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export const Navbar = () => (
  <div className="navbar">
    <NavLink className="navbar__navlink" to="/me">Me</NavLink>
    <NavLink className="navbar__navlink" to="/orders">Orders</NavLink>
  </div>
);
