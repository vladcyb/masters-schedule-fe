import React from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type PropsType = {
  visible: boolean
  className?: string
};

export const Spinner = ({
  visible,
  className,
}: PropsType) => {
  /* classes */
  const cn = createCn('spinner', className);

  return (
    <div className={cn()} style={{ visibility: visible ? 'visible' : 'hidden' }} />
  );
};
