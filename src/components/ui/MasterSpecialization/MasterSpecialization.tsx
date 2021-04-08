import React from 'react';
import './style.css';

type PropsType = {
  className?: string
  title: string
};

export const MasterSpecialization = ({
  title,
  className,
}: PropsType) => {
  /* methods */
  const handleDeleteClick = () => {
    console.log('TODO');
  };

  return (
    <div className={`masterSpecialization ${className}`}>
      <div className="masterSpecialization__wrapper">
        <div className="masterSpecialization__title">
          {title}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          className="masterSpecialization__delete"
          onClick={handleDeleteClick}
          type="button"
        />
      </div>
    </div>
  );
};
