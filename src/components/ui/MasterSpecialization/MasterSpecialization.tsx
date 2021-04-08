import React from 'react';
import { useAppDispatch } from '../../../store';
import { thunks } from '../../../store/thunks';
import './style.css';

type PropsType = {
  id: number
  masterId: number
  title: string
  className?: string
};

export const MasterSpecialization = ({
  id,
  masterId,
  title,
  className,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* methods */
  const handleDeleteClick = () => {
    dispatch(thunks.masters.deleteSpecialization({
      masterId,
      specializationId: id,
    }));
  };

  return (
    <div className={`masterSpecialization ${className}`}>
      <div className="masterSpecialization__wrapper">
        <div className="masterSpecialization__title">
          {title}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          className="masterSpecialization__delete"
          onClick={handleDeleteClick}
          type="button"
        />
      </div>
    </div>
  );
};
