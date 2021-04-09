import React from 'react';
import './style.css';

type PropsType = {
  id: number
  title: string
  masterId: number
  handleAdd: (masterId: number, specializationId: number) => void
};

export const AddSpecializationFormListItem = ({
  id,
  title,
  handleAdd,
  masterId,
}:PropsType) => {
  /* methods */
  const handleClick = () => {
    handleAdd(masterId, id);
  };

  return (
    <button className="addSpecializationFormListItem" type="button" onClick={handleClick}>
      {title}
    </button>
  );
};
