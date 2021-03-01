import React, { useCallback } from 'react';
import { MultiSelectOptionType } from '../types';
import './style.css';

type PropsType = {
  option: MultiSelectOptionType
  toggle: (value: number | string) => void
};

export const MultiSelectItem = ({ option, toggle }: PropsType) => {
  /* methods */
  const handleClick = useCallback(() => {
    toggle(option.value);
  }, [option.value, toggle]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`multiSelect__item ${option.selected ? 'multiSelect__item_selected' : ''}`}
      onClick={handleClick}
    >
      {option.title}
    </div>
  );
};
