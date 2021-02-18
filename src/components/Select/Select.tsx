import React from 'react';
import { createCn } from 'bem-react-classname';
import { SelectOptions } from './types';
import { UserRole } from '../../API/interfaces';

type PropsType = {
  options: SelectOptions<UserRole>
  className?: string
};

export const Select = ({
  options,
  className,
}: PropsType) => {
  console.log(options);

  /* classes */
  const cn = createCn('select', className);

  return (
    <select className={cn()}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.children}
        </option>
      ))}
    </select>
  );
};
