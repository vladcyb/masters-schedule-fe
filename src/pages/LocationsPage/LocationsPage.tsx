import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LocationThunk from '../../store/locationSlice/thunk';
import { getLocations } from '../../store/locationSlice/selectors';
import { Spinner } from '../../components/ui';
import { useAppDispatch } from '../../store';
import { Location } from '../../components/Location';
import './style.css';

export const LocationsPage = () => {
  /* hooks */
  const locations = useSelector(getLocations);
  const dispatch = useAppDispatch();

  /* effects */
  useEffect(() => {
    dispatch(LocationThunk.update());
  }, [dispatch]);

  return (
    <div className="locationsPage">
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
    </div>
  );
};
