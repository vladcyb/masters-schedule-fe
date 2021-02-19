import React from 'react';
import { createCn } from 'bem-react-classname';
import { SelectOptions } from './types';
import './style.css';

type PropsType = {
  options: SelectOptions
  className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  options,
  className,
  ...selectProps
}: PropsType) => {
  /* classes */
  const cn = createCn('select', className);

  return (
    <select className={cn()} {...selectProps}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
