import React, { FC } from 'react';
import './style.css';

type PropsType = {
  className?: string
};

export const Card: FC<PropsType> = ({ className, children }) => (
  <div className={`card ${className || ''}`}>
    {children}
  </div>
);
