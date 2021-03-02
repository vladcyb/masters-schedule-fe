import React, { useCallback } from 'react';
import { LocationType } from '../../shared/types';
import { Card } from '../ui';
import './style.css';
import { LocationTypeType } from '../../store/locationSlice/types';

type PropsType = {
  data: LocationType
  onDelete: (id: number) => void
  className?: string
  types: LocationTypeType[]
  nestingDegree: number
};

export const Location = ({
  types,
  nestingDegree,
  data: {
    id,
    title,
    children,
  },
  onDelete,
  className,
}: PropsType) => {
  /* methods */
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <>
      <Card className={`location location_${nestingDegree} ${className || ''}`}>
        <div>
          <div>
            <span className="location__itemTitle">Title: </span>
            <span className="location__itemValue">{title}</span>
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
          types={types}
          nestingDegree={nestingDegree + 1}
        />
      ))}
    </>
  );
};
