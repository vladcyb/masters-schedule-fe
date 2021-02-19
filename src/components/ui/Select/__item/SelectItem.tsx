import React, { Dispatch, SetStateAction } from 'react';
import { createCn } from 'bem-react-classname';
import { SelectOptionType } from '../types';
import './style.css';

type PropsType = {
  selected: any
  setSelected: Dispatch<SetStateAction<any>>
} & SelectOptionType;

export const SelectItem = ({
  title,
  selected,
  setSelected,
  value,
}: PropsType) => {
  /* classes */
  const cn = createCn('select__item');

  /* methods */
  const handleClick = () => {
    setSelected(value);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cn({ selected: selected === value })}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};
