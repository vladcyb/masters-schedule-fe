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
    <div>
      id:
      {specialization.id}
    </div>
    <div>
      title:
      {specialization.title}
    </div>
    <div>
      icon:
      {specialization.icon}
    </div>
  </Card>
);
