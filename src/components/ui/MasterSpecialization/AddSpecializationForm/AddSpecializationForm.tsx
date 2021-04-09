import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store';
import { thunks } from '../../../../store/thunks';
import { getSpecializations } from '../../../../store/specializationSlice/selectors';
import { Spinner, Button } from '../..';
import { AddSpecializationFormListItem } from './AddSpecializationFormListItem';
import './style.css';

type PropsType = {
  masterId: number
  className?: string
  onClose: () => void
};

export const AddSpecializationForm = ({
  masterId,
  className,
  onClose,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();
  const specializations = useSelector(getSpecializations);

  /* effects */
  useEffect(() => {
    dispatch(thunks.specialization.update());
  }, [dispatch]);

  /* methods */
  const handleAddSpecialization = (mId: number, specializationId: number) => {
    dispatch(thunks.masters.addSpecialization({
      masterId: mId,
      specializationId,
    }));
  };

  return (
    <div className={`addSpecializationForm ${className || ''}`}>
      {specializations.loading ? (
        <Spinner visible />
      ) : (
        <div className="addSpecializationForm__list">
          {specializations.data.map((item) => (
            <AddSpecializationFormListItem
              id={item.id}
              key={item.id}
              title={item.title}
              handleAdd={handleAddSpecialization}
              masterId={masterId}
            />
          ))}
        </div>
      )}
      <Button className="addSpecializationForm__close" onClick={onClose}>Закрыть</Button>
    </div>
  );
};
