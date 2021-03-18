import React, { Dispatch, SetStateAction, useState } from 'react';
import { parseISO } from 'date-fns';
import { OrderStatus } from '../../shared/types';
import { Card } from '../ui';
import { backendURL } from '../../config.json';
import { UserRole } from '../../API/interfaces';
import { EditStartDateForm } from './__editStartDateForm';
import './style.css';

const getShowDate = (date: string) => parseISO(date || '').toLocaleString();

type PropsType = {
  id: number
  description: string
  startDate: string | null
  finishDate: string | null
  status: OrderStatus
  comment: string | null
  photo: string
  address: string
  role: UserRole
  setModalError: Dispatch<SetStateAction<string>>
};

const OrderStatuses = {
  [OrderStatus.PENDING.toString()]: 'Ожидание',
  [OrderStatus.DONE.toString()]: 'Завершен',
  [OrderStatus.ABORTED.toString()]: 'Отменен',
  [OrderStatus.IN_PROGRESS.toString()]: 'В процессе',
  [OrderStatus.ON_REWORK.toString()]: 'На переработке',
};

export const Order = ({
  id,
  description,
  startDate,
  finishDate,
  status,
  comment,
  photo,
  address,
  role,
  setModalError,
}: PropsType) => {
  /* state */
  const [isStartDateEditing, setIsStartDateEditing] = useState(false);

  /* methods */
  const handleEditStartDateClick = () => {
    setIsStartDateEditing(true);
  };

  const stopEditingStartDate = () => {
    setIsStartDateEditing(false);
  };

  return (
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
            {startDate
              ? getShowDate(startDate)
              : '' || <i className="order__hint">(не назначено)</i>}
          </span>
          {role === UserRole.OPERATOR && (
            <button
              className="MySchedulePage__pencil"
              onClick={handleEditStartDateClick}
              type="button"
              aria-label="редактировать"
            />
          )}
          {isStartDateEditing && (
            <EditStartDateForm
              id={id}
              onClose={stopEditingStartDate}
              setModalError={setModalError}
            />
          )}
        </div>
        <div className="order__field">
          <span className="order__fieldName">Дата окончания: </span>
          <span className="order__fieldContent">
            {finishDate
              ? getShowDate(finishDate)
              : <i className="order__hint">(не назначено)</i>}
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
};
