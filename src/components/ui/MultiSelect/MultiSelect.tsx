import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { MultiSelectOptionType } from './types';
import { MultiSelectItem } from './MultiSelectItem';
import './style.css';

type PropsType = {
  className?: string
  options: MultiSelectOptionType[]
  setOptions: Dispatch<SetStateAction<MultiSelectOptionType[]>>
  label: string
};

export const MultiSelect = ({
  className,
  options,
  setOptions,
  label,
}: PropsType) => {
  /* state */
  const [isOpened, setIsOpened] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  /* methods */
  const handleClick = () => {
    setIsOpened((value) => !value);
  };

  const toggle = (value: number | string) => {
    setOptions((oldOptions) => {
      const newOptions = oldOptions.map((option) => ({ ...option }));
      const target = newOptions.find((option) => option.value === value);
      target!.selected = !target!.selected;
      return newOptions;
    });
  };

  /* effects */
  useEffect(() => {
    if (!options.length) {
      return;
    }
    let count = 0;
    options.forEach((option) => {
      if (option.selected) {
        count += 1;
      }
    });
    setSelectedCount(count);
  }, [options]);

  return (
    <div className={`multiSelect ${isOpened ? 'multiSelect_opened' : ''} ${className || ''}`}>
      <div className="multiSelect__label">
        {label}
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="multiSelect__main"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        Selected:
        {' '}
        {selectedCount}
      </div>
      {isOpened && (
        <div className="multiSelect__items">
          {options.map((option) => (
            <MultiSelectItem
              option={option}
              toggle={toggle}
              key={option.value}
            />
          ))}
        </div>
      )}
    </div>
  );
};
