import React from 'react';

export const Form = ({
  className,
  children,
  ...attributes
}: React.HTMLAttributes<HTMLFormElement>) => (
  <form className={`form ${className || ''}`} {...attributes}>
    {children}
  </form>
);
