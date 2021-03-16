import React, { useState } from 'react';
import { OrderStatus } from '../../shared/types';
import { Button, Card, Field } from '../ui';
import { backendURL } from '../../config.json';
import { UserRole } from '../../API/interfaces';
import { useInput } from '../../shared/hooks/useInput';
import './style.css';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';

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
}: PropsType) => {
  /* state */
  const [isStartDateEditing, setIsStartDateEditing] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();

  /* fields */
  const editStartDateField = useInput();

  /* methods */
  const handleEditStartDateClick = () => {
    setIsStartDateEditing(true);
  };

  const stopEditingStartDate = () => {
    setIsStartDateEditing(false);
  };

  const editStartDate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(thunks.order.setStartDate({
      id,
      date: editStartDateField.value,
    }));
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
            {startDate || <i className="order__hint">(не назначено)</i>}
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
            <form className="order__editStartDateForm" onSubmit={editStartDate}>
              <Field label="" {...editStartDateField} />
              <div>
                <Button className="order__save" sm type="submit">
                  Сохранить
                </Button>
                <Button
                  className="order__cancel"
                  onClick={stopEditingStartDate}
                  variant="outline"
                  sm
                >
                  Отмена
                </Button>
              </div>
            </form>
          )}
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
};
