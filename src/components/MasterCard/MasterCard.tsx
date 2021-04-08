import React from 'react';
import { Card } from '../ui';
import { MasterType } from '../../shared/types';
import { MasterSpecialization } from '../ui/MasterSpecialization';
import './style.css';

type PropsType = {
  className?: string
  master: MasterType
};

export const MasterCard = ({
  className,
  master,
}: PropsType) => (
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
          />
        ))}
      </span>
    </div>
  </Card>
);
