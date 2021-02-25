import React, { FC } from 'react';
import './style.css';

type PropsType = {
  className?: string
};

export const Container: FC<PropsType> = ({ className, children }) => (
  <div className={`container ${className || ''}`}>
    {children}
  </div>
);
