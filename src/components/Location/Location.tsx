import React, { useCallback } from 'react';
import { LocationType } from '../../shared/types';
import './style.css';
import { Card } from '../ui/Card';

type PropsType = {
  data: LocationType
  onDelete: (id: number) => void
};

export const Location = ({
  data: {
    id,
    title,
    coordinates,
    type: { title: type },
    parent,
  },
  onDelete,
}: PropsType) => {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);
  return (
    <Card className="location">
      <div>
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
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button className="location__delete" type="button" onClick={handleDelete} />
    </Card>
  );
};
