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
  [OrderStatus.PENDING.toString()]: 'Ожидание',
  [OrderStatus.DONE.toString()]: 'Завершен',
  [OrderStatus.ABORTED.toString()]: 'Отменен',
  [OrderStatus.IN_PROGRESS.toString()]: 'В процессе',
  [OrderStatus.ON_REWORK.toString()]: 'На переработке',
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
        <span className="order__fieldName">Описание: </span>
        <span className="order__fieldContent">{description}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Дата начала: </span>
        <span className="order__fieldContent">
          {startDate || <i className="order__hint">(не назначено)</i>}
        </span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Дата окончания: </span>
        <span className="order__fieldContent">
          {finishDate || <i className="order__hint">(не назначено)</i>}
        </span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Статус: </span>
        <span className="order__fieldContent">{OrderStatuses[status]}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Комментарий: </span>
        <span className="order__fieldContent">{comment}</span>
      </div>
      <div className="order__field">
        <span className="order__fieldName">Адрес: </span>
        <span className="order__fieldContent">{address}</span>
      </div>
    </div>
  </Card>
);
