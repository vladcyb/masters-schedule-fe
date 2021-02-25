import React, { useState } from 'react';
import { Button, Container } from '../../components/ui';
import { AddServiceForm } from '../../components';
import './style.css';

export const ServicesPage = () => {
  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const closeAddingForm = () => {
    setIsAdding(false);
  };

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
