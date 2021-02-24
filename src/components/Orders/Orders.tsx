import React from 'react';
import { Spinner } from '../ui';
import { Order } from '../Order';
import { OrdersStateType } from '../../store/userSlice/types';
import './style.css';

type PropsType = {
  orders: OrdersStateType
};

export const Orders = ({ orders }: PropsType) => (
  <div className="orders">
    {orders.loading ? (
      <Spinner visible />
    ) : (
      orders.data.map((order) => (
        <div className="orders__item" key={order.id}>
          <Order
            description={order.description}
            startDate={order.startDate}
            finishDate={order.finishDate}
            status={order.status}
            comment={order.comment}
            photo={order.photo}
            address={order.address}
          />
        </div>
      ))
    )}
  </div>
);