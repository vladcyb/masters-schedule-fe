import React from 'react';
import { OrderStatus } from '../../shared/types';
import { Card } from '../ui/Card';
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
    <div className="order__field">
      <span className="order__fieldName">Description: </span>
      <span className="order__fieldContent">{description}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Start date: </span>
      <span className="order__fieldContent">{startDate}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Finish date: </span>
      <span className="order__fieldContent">{finishDate}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Status: </span>
      <span className="order__fieldContent">{status}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Comment: </span>
      <span className="order__fieldContent">{comment}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Photo: </span>
      <span className="order__fieldContent">{photo}</span>
    </div>
    <div className="order__field">
      <span className="order__fieldName">Address: </span>
      <span className="order__fieldContent">{address}</span>
    </div>
  </Card>
);
