import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Order } from '../../components/Order';
import './style.css';

const fakeOrders = [{
  id: 1,
  description: 'string',
  startDate: 'string | null',
  finishDate: 'string | null',
  status: 1,
  comment: 'string | null',
  photo: 'string',
  address: 'string',
}, {
  id: 2,
  description: 'string',
  startDate: 'string | null',
  finishDate: 'string | null',
  status: 2,
  comment: 'string | null',
  photo: 'string',
  address: 'string',
}];

export const OrdersPage = () => (
  <div className="ordersPage">
    <Navbar />
    <div className="ordersPage__orders">
      {fakeOrders.map((order) => (
        <div className="ordersPage__order" key={order.id}>
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
      ))}
    </div>
  </div>
);
