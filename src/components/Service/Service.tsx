import React from 'react';
import { ServiceType } from '../../shared/types';
import { backendURL } from '../../config.json';
import './style.css';

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
  <div className={`service ${className || ''}`}>
    <img className="service__img" src={`${backendURL}/${specialization.icon}`} alt="" />
    <div>
      <div className="service__row">
        <div className="service__title">{title}</div>
      </div>
      <div className="service__row">
        <span className="service__rowTitle">Продолжительность, ч: </span>
        <span className="service__rowValue">{duration}</span>
      </div>
      <div className="service__row">
        <span className="service__rowTitle">Стоимость: </span>
        <span className="service__rowValue">{price}</span>
      </div>
      <div className="service__row">
        <span className="service__rowTitle">Специализация: </span>
        <span className="service__rowValue">{specialization.title}</span>
      </div>
    </div>
  </div>
);
