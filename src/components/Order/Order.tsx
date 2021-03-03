import React from 'react';
import { OrderStatus } from '../../shared/types';
import { Card } from '../ui';
import { backendURL } from '../../config.json';
import './style.css';

type PropsType = {
  description: string
  startDate: string | null
  finishDate: string | null
  status: OrderStatus
  comment: string | null
  photo: string
  address: string
};

const OrderStatuses = {
  [OrderStatus.PENDING.toString()]: 'pending',
  [OrderStatus.DONE.toString()]: 'done',
  [OrderStatus.ABORTED.toString()]: 'aborted',
  [OrderStatus.IN_PROGRESS.toString()]: 'in progress',
  [OrderStatus.ON_REWORK.toString()]: 'on rework',
};

export const Order = ({
  description,
  startDate,
  finishDate,
  status,
  comment,
  photo,
  address,
}: PropsType) => (
  <Card className="order">
    <img className="order__img" src={`${backendURL}/${photo}`} alt="" />
    <div>
      <div className="order__field">
        <span className="order__fieldName">Description: </span>
        <span className="order__fieldContent">{description}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Start date: </span>
        <span className="order__fieldContent">
          {startDate || <i className="order__hint">(not assigned)</i>}
        </span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Finish date: </span>
        <span className="order__fieldContent">
          {finishDate || <i className="order__hint">(not assigned)</i>}
        </span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Status: </span>
        <span className="order__fieldContent">{OrderStatuses[status]}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Comment: </span>
        <span className="order__fieldContent">{comment}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Address: </span>
        <span className="order__fieldContent">{address}</span>
      </div>
    </div>
  </Card>
);
