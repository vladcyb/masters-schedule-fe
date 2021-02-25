import React from 'react';
import { Card } from '../ui/Card';
import { SpecializationType } from '../../shared/types';
import './style.css';

type PropsType = {
  specialization: SpecializationType
  className?: string
};

export const Specialization = ({
  className,
  specialization,
}: PropsType) => (
  <Card className={`specialization ${className || ''}`}>
    <img className="specialization__icon" src={specialization.icon} alt="" />
    <div>
      {specialization.title}
    </div>
  </Card>
);
