import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LocationThunk from '../../store/locationSlice/thunk';
import { getLocations } from '../../store/locationSlice/selectors';
import { Button, Spinner } from '../../components/ui';
import { useAppDispatch } from '../../store';
import { Location } from '../../components/Location';
import { AddLocationForm } from '../../components/AddLocationForm';
import './style.css';

export const LocationsPage = () => {
  /* hooks */
  const locations = useSelector(getLocations);
  const dispatch = useAppDispatch();

  /* state */
  const [isAdding, setIsAdding] = useState(false);

  /* effects */
  useEffect(() => {
    dispatch(LocationThunk.update());
  }, [dispatch]);

  /* methods */
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const cancelAdding = () => {
    setIsAdding(false);
  };

  return (
    <div className="locationsPage">
      {isAdding ? (
        <AddLocationForm className="locationsPage__addForm" cancelAdding={cancelAdding} />
      ) : (
        <>
          {locations.loading ? (
            <Spinner visible />
          ) : (
            locations.data.map((item) => (
              <div className="locationsPage__location" key={item.id}>
                <Location data={item} />
              </div>
            ))
          )}
          {!locations.data.length && !locations.loading && (
            <i>(empty)</i>
          )}
          <Button className="locationsPage__addButton" onClick={handleAddClick}>
            Add
          </Button>
        </>
      )}
    </div>
  );
};
