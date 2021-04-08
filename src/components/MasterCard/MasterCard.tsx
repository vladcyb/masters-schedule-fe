import React from 'react';
import { Card } from '../ui';
import { MasterType } from '../../shared/types';
import './style.css';

type PropsType = {
  className?: string
  master: MasterType
};

// TODO: редактирование специализаций
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
          `${specialization.title}; `
        ))}
      </span>
    </div>
  </Card>
);
