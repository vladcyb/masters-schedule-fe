import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Spinner } from '../ui';
import { Order } from '../Order';
import { UserRole } from '../../API/interfaces';
import { getOrders } from '../../store/orderSlice/selectors';
import './style.css';

type PropsType = {
  role: UserRole
};

export const Orders = ({
  role,
}: PropsType) => {
  /* state */
  const [modalError, setModalError] = useState('');

  /* hooks */
  const orders = useSelector(getOrders);

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
            services={order.services}
            master={order.master}
            setModalError={setModalError}
            price={order.price}
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
