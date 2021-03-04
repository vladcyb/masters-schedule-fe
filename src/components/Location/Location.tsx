import React, { useCallback, useState } from 'react';
import { LocationType } from '../../shared/types';
import { LocationTypeType } from '../../store/locationSlice/types';
import { Button, Field } from '../ui';
import { useField, useSetters } from '../../shared/hooks';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
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
  /* hooks */
  const [getters, setters] = useSetters();
  const dispatch = useAppDispatch();

  /* state */
  const [isOpened, setIsOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /* vars */
  const hasChildren = children.length !== 0;
  const newTitle = useField('title', getters, setters, false, title);

  /* methods */
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);

  const toggle = () => {
    setIsOpened((value) => !value);
  };

  const handleClickTitle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(thunks.location.edit({
      id,
      title: newTitle.props.value,
    }));
    setIsEditing(false);
  };

  /* classes */
  const classes = `
    location ${hasChildren ? 'location_hasChildren' : ''}
    location_${nestingDegree} ${isOpened ? 'location_opened' : ''} ${className || ''}
  `;

  return (
    <>
      <div className={classes}>
        {isEditing ? (
          <form className="location__edit" autoComplete="off" onSubmit={handleEditSubmit}>
            <Field label="Enter new title" {...newTitle.props} autoFocus />
            <div className="location__editButtons">
              <Button className="location__save" type="submit" sm>
                Save
              </Button>
              <Button variant="outline" className="location__cancel" onClick={handleCancelEdit} sm>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="location__toggle" type="button" onClick={toggle} />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div className="location__title" onClick={handleClickTitle} tabIndex={0} role="button">
              {title}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="location__delete" onClick={handleDelete} type="button" />
          </>
        )}
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
