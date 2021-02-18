import React from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

export const Button = ({
  children,
  type = 'button',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const cn = createCn('button', className);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={cn()} type={type} {...props}>{children}</button>
  );
};
