import React, { useState } from 'react';
import { Modal, Spinner } from '../ui';
import { Order } from '../Order';
import { StateType as OrdersStateType } from '../../store/orderSlice/types';
import { UserRole } from '../../API/interfaces';
import './style.css';

type PropsType = {
  orders: OrdersStateType
  role: UserRole
};

export const Orders = ({ orders, role }: PropsType) => {
  /* state */
  const [modalError, setModalError] = useState('');

  /* methods */
  const closeErrorModal = () => {
    setModalError('');
  };

  return (
    <div className="orders">
      <Spinner visible={orders.loading} />
      {orders.data.map((order) => (
        <div className="orders__item" key={order.id}>
          <Order
            id={order.id}
            description={order.description}
            startDate={order.startDate}
            finishDate={order.finishDate}
            status={order.status}
            comment={order.comment}
            photo={order.photo}
            address={order.address}
            role={role}
            setModalError={setModalError}
          />
        </div>
      ))}
      {!orders.data.length && !orders.loading && (
        <i>(пусто)</i>
      )}
      {modalError && <Modal message={modalError} onClose={closeErrorModal} />}
    </div>
  );
};
