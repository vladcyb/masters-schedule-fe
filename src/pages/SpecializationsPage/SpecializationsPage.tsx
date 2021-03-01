import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { thunks } from '../../store/thunks';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { useAppDispatch } from '../../store';
import { Button, Container } from '../../components/ui';
import {
  AddSpecializationForm,
  Specialization,
} from '../../components';
import './style.css';

export const SpecializationsPage = () => {
  /* hooks */
  const specializations = useSelector(getSpecializations);
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* effects */
  useEffect(() => {
    dispatch(thunks.specialization.update());
  }, [dispatch]);

  /* methods */
  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  return (
    <Container className="specializationsPage">
      {isAdding ? (
        <>
          <div className="specializationsPage__title title center">
            Add specialization
          </div>
          <AddSpecializationForm
            className="specializationsPage__form"
            close={handleCancelAdd}
            isLoading={specializations.loading}
          />
        </>
      ) : (
        <>
          <div className="specializationsPage__list">
            {specializations.data.map((item) => (
              <Specialization
                className="specializationsPage__item"
                specialization={item}
                key={item.id}
              />
            ))}
          </div>
          <Button className="specializationsPage__add" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}

    </Container>
  );
};
