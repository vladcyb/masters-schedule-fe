import React, { useEffect } from 'react';
import { hours } from '../../../shared/constants';
import { ScheduleRow } from './__row';
import { useAppDispatch } from '../../../store';
import { thunks } from '../../../store/thunks';
import { OrderType } from '../../../shared/types';
import './style.css';

type PropsType = {
  orders: OrderType[]
  selectedDate: string
};

export const OrdersSchedule = ({ orders, selectedDate }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* methods */
  useEffect(() => {
    dispatch(thunks.order.get());
  }, [dispatch]);

  return (
    <table className="ordersSchedule">
      <tbody>
        <tr className="ordersSchedule__tr">
          <td className="ordersSchedule__td">
            Наименование заказа
          </td>
          {hours.map((hour) => (
            <td className="ordersSchedule__td" key={hour}>
              {hour}
              :00
            </td>
          ))}
        </tr>
        {orders.map((order) => (
          <ScheduleRow
            id={order.id}
            startDate={order.startDate}
            finishDate={order.finishDate}
            selectedDate={selectedDate}
            key={order.id}
          />
        ))}
      </tbody>
    </table>
  );
};
