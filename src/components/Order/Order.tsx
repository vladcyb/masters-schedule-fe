import React, { Dispatch, SetStateAction, useState } from 'react';
import { parseISO } from 'date-fns';
import { OrderStatus, ServiceType } from '../../shared/types';
import { Card } from '../ui';
import { backendURL } from '../../config.json';
import { UserRole } from '../../API/interfaces';
import { EditStartDateForm } from './__editStartDateForm';
import { EditServices } from './__editServices';
import { EditMaster } from './__editMaster';
import './style.css';

const getShowDate = (date: string) => parseISO(date).toLocaleString();

const getServicesTitles = (services: Partial<ServiceType[]>) => (
  services.map((item) => item!.title).join(', ')
);

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
  services: Partial<ServiceType[]>
  price: number
  master: {
    id: number
  }
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
  services,
  master,
  price,
}: PropsType) => {
  /* state */
  const [isStartDateEditing, setIsStartDateEditing] = useState(false);
  const [isServicesEditing, setIsServicesEditing] = useState(false);
  const [isMasterEditing, setIsMasterEditing] = useState(false);

  /* methods */
  const handleEditStartDateClick = () => {
    setIsStartDateEditing(true);
  };

  const handleEditMasterClick = () => {
    setIsMasterEditing((prevValue) => !prevValue);
  };

  const stopEditMaster = () => {
    setIsMasterEditing(false);
  };

  const stopEditingStartDate = () => {
    setIsStartDateEditing(false);
  };

  const handleEditServicesClick = () => {
    setIsServicesEditing(true);
  };

  const stopEditServices = () => {
    setIsServicesEditing(false);
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
          {(role === UserRole.OPERATOR || role === UserRole.CLIENT) && (
            <button
              className="MySchedulePage__pencil"
              onClick={handleEditStartDateClick}
              type="button"
              aria-label="редактировать дату начала"
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
        <div className="order__field">
          <span className="order__fieldName">Мастер: </span>
          <span className="order__fieldContent">
            {master ? master.id : <i className="order__hint">(не назначено)</i>}
          </span>
          {role === UserRole.OPERATOR && (
            <button
              className="MySchedulePage__pencil"
              onClick={handleEditMasterClick}
              type="button"
              aria-label="редактировать мастера"
            />
          )}
          {isMasterEditing && (
            <EditMaster
              orderId={id}
              close={stopEditMaster}
            />
          )}
        </div>
        <div className="order__field">
          <span className="order__fieldName">Услуги: </span>
          <span className="order__fieldContent">
            {services.length ? getServicesTitles(services) : (
              <i className="order__hint">(не назначено)</i>
            )}
          </span>
          {role === UserRole.OPERATOR && (
            <button
              className="MySchedulePage__pencil"
              onClick={handleEditServicesClick}
              type="button"
              aria-label="редактировать список услуг"
            />
          )}
          {isServicesEditing && (
            <EditServices
              orderId={id}
              close={stopEditServices}
              setModalError={setModalError}
              selectedServices={services.map((item) => item!.id)}
            />
          )}
        </div>
        <div className="order__field">
          <span className="order__fieldName">Стоимость: </span>
          <span className="order__fieldContent">
            {price}
          </span>
        </div>
      </div>
    </Card>
  );
};
