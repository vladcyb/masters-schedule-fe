import React from 'react';
import './style.css';

export const Form = ({
  className,
  children,
  ...attributes
}: React.HTMLAttributes<HTMLFormElement>) => (
  <form className={`form ${className || ''}`} {...attributes} autoComplete="off">
    {children}
  </form>
);
