import React, { useEffect, useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { dateFormat, hours } from '../../../shared/constants';
import { ScheduleRow } from './__row';
import { useAppDispatch } from '../../../store';
import { thunks } from '../../../store/thunks';
import { OrderType } from '../../../shared/types';
import './style.css';

type PropsType = {
  orders: OrderType[]
};

export const OrdersSchedule = ({ orders }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [selectedDate, setSelectedDate] = useState(format(new Date(), dateFormat));

  /* methods */
  const decrementDate = () => {
    setSelectedDate((oldValue) => format(addDays(parseISO(oldValue), -1), dateFormat));
  };

  const incrementDate = () => {
    setSelectedDate((oldValue) => format(addDays(parseISO(oldValue), 1), dateFormat));
  };

  useEffect(() => {
    dispatch(thunks.order.get());
  }, [dispatch]);

  return (
    <div className="ordersSchedule">
      <div className="ordersSchedule__date">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="ordersSchedule__datePrev" onClick={decrementDate} type="button" />
        <div className="ordersSchedule__dateValue">
          {selectedDate}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="ordersSchedule__dateNext" onClick={incrementDate} type="button" />
      </div>
      <table className="ordersSchedule__table">
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
    </div>
  );
};
