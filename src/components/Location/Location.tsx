import React, { useCallback } from 'react';
import { LocationType } from '../../shared/types';
import { Card } from '../ui';
import './style.css';

type PropsType = {
  data: LocationType
  onDelete: (id: number) => void
  className?: string
};

export const Location = ({
  data: {
    id,
    title,
    coordinates,
    typeId,
    children,
  },
  onDelete,
  className,
}: PropsType) => {
  /* methods */
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <>
      <Card className={`location location_${typeId} ${className || ''}`}>
        <div>
          <div>
            <span className="location__itemTitle">Id: </span>
            <span className="location__itemValue">{id}</span>
          </div>
          <div>
            <span className="location__itemTitle">Title: </span>
            <span className="location__itemValue">{title}</span>
          </div>
          <div>
            <span className="location__itemTitle">Coordinates: </span>
            <span className="location__itemValue">{coordinates}</span>
          </div>
          <div>
            <span className="location__itemTitle">Type: </span>
            <span className="location__itemValue">{typeId}</span>
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="location__delete" type="button" onClick={handleDelete} />
      </Card>
      {children.map((childLocation) => (
        <Location
          className={className}
          data={childLocation}
          onDelete={onDelete}
          key={childLocation.id}
        />
      ))}
    </>
  );
};
