import React, { Dispatch, SetStateAction, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { SelectOptionType } from './types';
import { SelectItem } from './__item/SelectItem';
import './style.css';

type PropsType = {
  options: SelectOptionType[]
  className?: string
  selected: any
  setSelected: Dispatch<SetStateAction<any>>
  label: string
};

export const Select = ({
  options,
  className,
  selected,
  setSelected,
  label,
}: PropsType) => {
  /* classes */
  const cn = createCn('select', className);

  /* state */
  const [isOpened, setIsOpened] = useState(false);

  /* methods */
  const handleClick = () => {
    setIsOpened((oldValue) => !oldValue);
  };

  const close = () => {
    setIsOpened(false);
  };

  return (
    <div
      className={cn({ opened: isOpened })}
    >
      <div className={cn('label')}>
        {label}
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={cn('main')}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {options.find((option) => option.value === selected)?.title || <i>(not chosen)</i>}
      </div>
      <div className={cn('options')}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            title={option.title}
            value={option.value}
            icon={option.icon}
            selected={selected}
            setSelected={setSelected}
            close={close}
          />
        ))}
      </div>
    </div>
  );
};
