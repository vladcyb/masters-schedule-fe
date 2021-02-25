import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpecializationsThunk from '../../store/specializationSlice/thunk';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { useAppDispatch } from '../../store';
import { Specialization } from '../../components/Specialization';
import { Button, Container } from '../../components/ui';
import {
  AddSpecializationForm,
} from '../../components/AddSpecializationForm/AddSpecializationForm';
import './style.css';

export const SpecializationsPage = () => {
  /* hooks */
  const specializations = useSelector(getSpecializations);
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* effects */
  useEffect(() => {
    dispatch(SpecializationsThunk.update());
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
        <AddSpecializationForm close={handleCancelAdd} />
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