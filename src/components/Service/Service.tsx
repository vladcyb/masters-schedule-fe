import React from 'react';
import { ServiceType } from '../../shared/types';
import { Card } from '../ui';

type PropsType = {
  data: ServiceType
  className?: string
};

export const Service = ({
  data: {
    title, duration, price, specialization,
  },
  className,
}: PropsType) => (
  <Card className={`service ${className || ''}`}>
    <div className="service__row">
      <span className="service__rowTitle">Title: </span>
      <span className="service__rowValue">{title}</span>
    </div>
    <div className="service__row">
      <span className="service__rowTitle">Duration: </span>
      <span className="service__rowValue">{duration}</span>
    </div>
    <div className="service__row">
      <span className="service__rowTitle">Price: </span>
      <span className="service__rowValue">{price}</span>
    </div>
    <div className="service__row">
      <span className="service__rowTitle">Specialization: </span>
      <span className="service__rowValue">{specialization.title}</span>
    </div>
  </Card>
);
