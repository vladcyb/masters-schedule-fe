import React from 'react';
import { LocationType } from '../../shared/types';
import './style.css';

type PropsType = {
  data: LocationType
};

export const Location = ({
  data: {
    title,
    coordinates,
    type: { title: type },
  },
}: PropsType) => (
  <div className="location">
    <div>
      <span>Title: </span>
      <span>{title}</span>
    </div>
    <div>
      <span>Coordinates: </span>
      <span>{coordinates}</span>
    </div>
    <div>
      <span>Type: </span>
      <span>{type}</span>
    </div>
  </div>
);
