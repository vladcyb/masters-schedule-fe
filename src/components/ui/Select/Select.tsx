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
};

export const Select = ({
  options,
  className,
  selected,
  setSelected,
}: PropsType) => {
  /* classes */
  const cn = createCn('select', className);

  /* state */
  const [isOpened, setIsOpened] = useState(false);

  /* methods */
  const handleClick = () => {
    setIsOpened((oldValue) => !oldValue);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn({ opened: isOpened })}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={cn('main')}>
        {options.find((option) => option.value === selected)!.title}
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
          />
        ))}
      </div>
    </div>
  );
};
