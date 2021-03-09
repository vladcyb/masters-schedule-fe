import React from 'react';
import { SpecializationType } from '../../shared/types';
import { backendURL } from '../../config.json';
import './style.css';

type PropsType = {
  specialization: SpecializationType
  className?: string
};

export const Specialization = ({
  className,
  specialization,
}: PropsType) => (
  <div className={`specialization ${className || ''}`}>
    <img className="specialization__icon" src={`${backendURL}/${specialization.icon}`} alt="" />
    <div>
      {specialization.title}
    </div>
  </div>
);
