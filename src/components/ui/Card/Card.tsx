import React, { FC } from 'react';
import './style.css';

type PropsType = {
  className?: string
  variant?: 'white' | 'danger' | 'success' | 'light'
};

export const Card: FC<PropsType> = ({ className, variant = 'white', children }) => (
  <div className={`card card_${variant} ${className || ''}`}>
    {children}
  </div>
);
