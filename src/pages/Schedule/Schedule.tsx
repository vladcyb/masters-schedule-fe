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

export const Schedule = ({ orders }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [selectedDate, setSelectedDate] = useState(format(new Date(), dateFormat));

  /* methods */
  const decrementDate = () => {
    setSelectedDate(format(addDays(parseISO(selectedDate), -1), dateFormat));
  };

  const incrementDate = () => {
    setSelectedDate(format(addDays(parseISO(selectedDate), 1), dateFormat));
  };

  useEffect(() => {
    dispatch(thunks.order.get());
  }, [dispatch]);

  return (
    <Container className="schedule">
      <div className="schedule__date">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="schedule__datePrev" onClick={decrementDate} type="button" />
        <div className="schedule__dateValue">
          {selectedDate}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="schedule__dateNext" onClick={incrementDate} type="button" />
      </div>
      <table className="schedule__table">
        <tbody>
          <tr className="schedule__tr">
            <td className="schedule__td">
              Наименование заказа
            </td>
            {hours.map((hour) => (
              <td className="schedule__td" key={hour}>
                {hour}
                :00
              </td>
            ))}
          </tr>
          {orders.map((order) => (
            <ScheduleRow id={order.id} startDate={order.startDate} finishDate={order.finishDate} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};
