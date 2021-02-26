import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Spinner } from '../../components/ui';
import { AddServiceForm, Service } from '../../components';
import { ServiceThunk } from '../../store/serviceSlice/thunk';
import { useAppDispatch } from '../../store';
import { getServices } from '../../store/serviceSlice/selectors';
import './style.css';

export const ServicesPage = () => {
  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();
  const services = useSelector(getServices);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const closeAddingForm = () => {
    setIsAdding(false);
  };

  /* effects */
  useEffect(() => {
    dispatch(ServiceThunk.update());
  }, [dispatch]);

  return (
    <Container className="servicesPage">
      {isAdding ? (
        <>
          <div className="center title">Add service</div>
          <AddServiceForm
            className="servicesPage__form"
            close={closeAddingForm}
            isLoading={services.loading}
          />
        </>
      ) : (
        <>
          <Spinner visible={services.loading} />
          {services.data.map((item) => (
            <Service className="servicesPage__item" data={(item)} key={item.id} />
          ))}
          <Button className="servicesPage__add" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}
    </Container>
  );
};
