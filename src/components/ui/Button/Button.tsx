import React from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type PropsType = {
  variant?: 'primary' | 'outline'
  sm?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  type = 'button',
  className,
  variant = 'primary',
  sm,
  ...props
}: PropsType) => {
  const cn = createCn('button', className);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={cn({ [variant]: true, sm: !!sm })} type={type} {...props}>
      {children}
    </button>
  );
};
