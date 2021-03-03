import React, { useCallback, useState } from 'react';
import { LocationType } from '../../shared/types';
import { Card } from '../ui';
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
  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

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
        <div className="location__controls">
          {children.length !== 0 && (
            isOpened ? (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button className="location__close" onClick={handleClose} type="button" />
            ) : (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button className="location__open" onClick={handleOpen} type="button" />
            )
          )}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className="location__delete" onClick={handleDelete} type="button" />
        </div>
      </Card>
      {isOpened && children.length !== 0 && (
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
