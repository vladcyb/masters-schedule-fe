import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { thunks } from '../../store/thunks';
import { getLocations } from '../../store/locationSlice/selectors';
import {
  Button, Spinner, Container, Modal,
} from '../../components/ui';
import { useAppDispatch } from '../../store';
import { Location, CreateLocationForm } from '../../components';
import { getLocationById } from '../../store/locationSlice/methods';
import './style.css';

export const LocationsPage = () => {
  /* hooks */
  const locations = useSelector(getLocations);
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);
  const [deletingLocation, setDeletingLocation] = useState<undefined | number>(undefined);
  const [error, setError] = useState('');

  const deletingLocationTitle = deletingLocation
    ? getLocationById(locations.data, 0, deletingLocation)!.title : '';

  /* effects */
  useEffect(() => {
    dispatch(thunks.location.update());
  }, [dispatch]);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const closeErrorModal = () => {
    setError('');
  };

  const closeModal = () => {
    setDeletingLocation(undefined);
  };

  const cancelAdding = () => {
    setIsAdding(false);
  };

  const handleDeleteLocation = (id: number) => {
    setDeletingLocation(id);
  };

  const deleteLocation = async () => {
    if (!deletingLocation) {
      return;
    }
    closeModal();
    const result = await dispatch(thunks.location.delete(deletingLocation));
    if (result.meta.requestStatus === 'rejected') {
      setError(result.payload as string);
    }
  };

  return (
    <>
      <Container className="locationsPage">
        {isAdding ? (
          <>
            <div className="center title">Новое местоположение</div>
            <CreateLocationForm
              className="locationsPage__createForm"
              close={cancelAdding}
              locations={locations}
              isLoading={locations.loading}
            />
          </>
        ) : (
          <>
            <Spinner visible={locations.loading} />
            {locations.data.map((item) => (
              <Location
                className="locationsPage__location"
                data={item}
                onDelete={handleDeleteLocation}
                types={locations.types}
                nestingDegree={1}
                key={item.id}
              />
            ))}
            {!locations.data.length && !locations.loading && (
              <div>
                <i>(пусто)</i>
              </div>
            )}
            <Button className="locationsPage__createButton" onClick={handleAddClick}>
              Создать
            </Button>
          </>
        )}
      </Container>
      {deletingLocation && (
        <Modal
          message={`Вы уверены, что хотите удалить местоположение "${deletingLocationTitle}"?`}
          onClose={closeModal}
          onConfirm={deleteLocation}
        />
      )}
      {error && <Modal message={error} onClose={closeErrorModal} />}
    </>
  );
};
