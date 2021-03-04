import React, { useCallback, useState } from 'react';
import { LocationType } from '../../shared/types';
import { LocationTypeType } from '../../store/locationSlice/types';
import './style.css';

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

  /* state */
  const [isOpened, setIsOpened] = useState(false);

  /* methods */
  const toggle = () => {
    setIsOpened((value) => !value);
  };

  /* vars */
  const hasChildren = children.length !== 0;

  /* classes */
  const classes = `
    location ${hasChildren ? 'location_hasChildren' : ''}
    location_${nestingDegree} ${isOpened ? 'location_opened' : ''} ${className || ''}
  `;

  return (
    <>
      <div className={classes}>
        <div className="location__title">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className="location__toggle" type="button" onClick={toggle} />
          {title}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="location__delete" onClick={handleDelete} type="button" />
      </div>
      {isOpened && hasChildren && (
        children.map((childLocation) => (
          <Location
            className={className}
            data={childLocation}
            onDelete={onDelete}
            key={childLocation.id}
            types={types}
            nestingDegree={nestingDegree + 1}
          />
        ))
      )}
    </>
  );
};
