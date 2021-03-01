import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { thunks } from '../../store/thunks';
import { getLocations } from '../../store/locationSlice/selectors';
import { Button, Spinner, Container } from '../../components/ui';
import { useAppDispatch } from '../../store';
import { Location, AddLocationForm } from '../../components';
import './style.css';

export const LocationsPage = () => {
  /* hooks */
  const locations = useSelector(getLocations);
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* effects */
  useEffect(() => {
    dispatch(thunks.location.update());
  }, [dispatch]);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const cancelAdding = () => {
    setIsAdding(false);
  };

  const handleDeleteLocation = async (id: number) => {
    const result = await dispatch(thunks.location.delete(id));
    if (result.meta.requestStatus === 'rejected') {
      alert(result.payload);
    }
  };

  return (
    <Container className="locationsPage">
      {isAdding ? (
        <AddLocationForm
          className="locationsPage__addForm"
          close={cancelAdding}
          locations={locations}
          isLoading={locations.loading}
        />
      ) : (
        <>
          <Spinner visible={locations.loading} />
          {locations.data.map((item) => (
            <div className="locationsPage__location" key={item.id}>
              <Location data={item} onDelete={handleDeleteLocation} />
            </div>
          ))}
          {!locations.data.length && !locations.loading && (
            <div>
              <i>(empty)</i>
            </div>
          )}
          <Button className="locationsPage__addButton" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}
    </Container>
  );
};
