import React, { useState } from 'react';
import { Card } from '../ui';
import { MasterType } from '../../shared/types';
import { MasterSpecialization } from '../ui/MasterSpecialization';
import { AddSpecializationForm } from '../ui/MasterSpecialization/AddSpecializationForm';
import './style.css';

type PropsType = {
  className?: string
  master: MasterType
};

export const MasterCard = ({
  className,
  master,
}: PropsType) => {
  /* state */
  const [isSpecializationAdding, addIsSpecializationAdding] = useState(false);

  /* methods */
  const handleAddSpecializationClick = () => {
    addIsSpecializationAdding(true);
  };

  return (
    <Card className={`masterCard ${className || ''}`} key={master.id}>
      <div>
        <span className="masterCard__fieldName">ФИО: </span>
        <span className="masterCard__fieldContent">
          {`${master.user.surname} ${master.user.name} ${master.user.patronymic}`}
        </span>
      </div>
      <div>
        <span className="masterCard__fieldName">Специализации: </span>
        <span className="masterCard__fieldContent">
          {master.specializations.map((specialization) => (
            <MasterSpecialization
              className="masterCard__specialization"
              title={specialization.title}
              key={specialization.id}
              id={specialization.id}
              masterId={master.id}
            />
          ))}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="masterCard__addSpec"
            type="button"
            onClick={handleAddSpecializationClick}
          >
            +
          </button>
        </span>
      </div>
      {isSpecializationAdding && <AddSpecializationForm masterId={master.id} />}
    </Card>
  );
};
