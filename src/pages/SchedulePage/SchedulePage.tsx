import React from 'react';
import { Container } from '../../components/ui';
import { OrderType } from '../../shared/types';
import { OrdersSchedule } from './OrdersSchedule';
import './style.css';

type PropsType = {
  orders: OrderType[]
};

export const SchedulePage = ({ orders }: PropsType) => (
  <Container>
    <OrdersSchedule orders={orders} />
  </Container>
);
