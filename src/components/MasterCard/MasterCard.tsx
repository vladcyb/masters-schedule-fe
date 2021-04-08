import React from 'react';
import { Card } from '../ui';
import { MasterType } from '../../shared/types';
import './style.css';

type PropsType = {
  className?: string
  master: MasterType
};

export const MasterCard = ({
  className,
  master,
}: PropsType) => {
  /* methods */
  const handleDeleteSpecializationClick = () => {
    console.log(123123132132);
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
            <div className="masterCard__specialization" key={specialization.id}>
              <div className="masterCard__specializationWrapper">
                <div className="masterCard__specializationTitle">
                  {specialization.title}
                </div>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  className="masterCard__deleteSpecialization"
                  onClick={handleDeleteSpecializationClick}
                  type="button"
                />
              </div>
            </div>
          ))}
        </span>
      </div>
    </Card>
  );
};
