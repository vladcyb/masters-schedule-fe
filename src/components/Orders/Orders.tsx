import React from 'react';
import { Spinner } from '../ui';
import { Order } from '../Order';
import { StateType as OrdersStateType } from '../../store/orderSlice/types';
import { UserRole } from '../../API/interfaces';
import './style.css';

type PropsType = {
  orders: OrdersStateType
  role: UserRole
};

export const Orders = ({ orders, role }: PropsType) => (
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
        />
      </div>
    ))}
    {!orders.data.length && !orders.loading && (
      <i>(пусто)</i>
    )}
  </div>
);
