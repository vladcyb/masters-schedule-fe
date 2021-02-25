import React, { useEffect, useState } from 'react';
import { Button, Container } from '../../components/ui';
import { AddServiceForm } from '../../components';
import { ServiceThunk } from '../../store/serviceSlice/thunk';
import { useAppDispatch } from '../../store';
import './style.css';

export const ServicesPage = () => {
  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const closeAddingForm = () => {
    setIsAdding(false);
  };

  useEffect(() => {
    dispatch(ServiceThunk.update());
  });

  return (
    <Container className="servicesPage">
      {isAdding ? (
        <>
          <div className="center title">Add service</div>
          <AddServiceForm className="servicesPage__form" close={closeAddingForm} />
        </>
      ) : (
        <Button className="servicesPage__add" onClick={handleAddClick}>
          Add
        </Button>
      )}
    </Container>
  );
};
