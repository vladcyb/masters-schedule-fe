import React from 'react';
import { LocationType } from '../../shared/types';
import './style.css';

type PropsType = {
  data: LocationType
};

export const Location = ({
  data: {
    id,
    title,
    coordinates,
    type: { title: type },
    parent,
  },
}: PropsType) => (
  <div className="location">
    <div>
      <span>Id: </span>
      <span>{id}</span>
    </div>
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
    <div>
      <span>Parent id: </span>
      <span>{parent ? parent.id : <i className="location__hint">(no parent)</i>}</span>
    </div>
  </div>
);
