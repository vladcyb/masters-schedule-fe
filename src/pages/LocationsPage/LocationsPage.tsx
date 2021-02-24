import React, { useEffect } from 'react';
import { Navbar } from '../../components/ui';

export const LocationsPage = () => {
  /* effects */
  useEffect(() => {
    console.log(0xff);
  }, []);

  return (
    <div className="locationsPage">
      <Navbar />
      LocationsPage
    </div>
  );
};
