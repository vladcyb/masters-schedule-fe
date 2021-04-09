import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '../../Form';
import { useAppDispatch } from '../../../../store';
import { thunks } from '../../../../store/thunks';
import { getSpecializations } from '../../../../store/specializationSlice/selectors';
import { Spinner } from '../../Spinner';
import { AddSpecializationFormListItem } from './AddSpecializationFormListItem';

type PropsType = {
  masterId: number
};

export const AddSpecializationForm = ({ masterId }: PropsType) => {
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
    <Form className="addSpecializationForm">
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
    </Form>
  );
};
