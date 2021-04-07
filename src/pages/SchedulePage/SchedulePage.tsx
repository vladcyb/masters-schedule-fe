import React, { useEffect, useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { Container } from '../../components/ui';
import { OrderType } from '../../shared/types';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
import { dateFormat, hours } from '../../shared/constants';
import { ScheduleRow } from './__row';
import './style.css';

type PropsType = {
  orders: OrderType[]
};

export const SchedulePage = ({ orders }: PropsType) => {
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
    <Container>
      <div className="schedulePage__date">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="schedulePage__datePrev" onClick={decrementDate} type="button" />
        <div className="schedulePage__dateValue">
          {selectedDate}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="schedulePage__dateNext" onClick={incrementDate} type="button" />
      </div>
      <table className="schedulePage__table">
        <tbody>
          <tr className="schedulePage__tr">
            <td className="schedulePage__td">
              Наименование заказа
            </td>
            {hours.map((hour) => (
              <td className="schedulePage__td" key={hour}>
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
    </Container>
  );
};
