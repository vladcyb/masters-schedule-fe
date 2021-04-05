import React, { useEffect, useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { Container } from '../../components/ui';
import { OrderType } from '../../shared/types';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
import { dateFormat } from '../../shared/constants';
import './style.css';

const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

type PropsType = {
  orders: OrderType[]
};

export const Schedule = ({ orders }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [currentDate, setCurrentDate] = useState(format(new Date(), dateFormat));

  /* methods */
  const decrementDate = () => {
    setCurrentDate(format(addDays(parseISO(currentDate), -1), dateFormat));
  };

  const incrementDate = () => {
    setCurrentDate(format(addDays(parseISO(currentDate), 1), dateFormat));
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
          {currentDate}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="schedule__dateNext" onClick={incrementDate} type="button" />
      </div>
      <table className="schedule__table">
        <tbody>
          <tr className="schedule__tr">
            <td className="schedule__td schedule__tdTitle">
              Наименование заказа
            </td>
            {hours.map((hour) => (
              <td className="schedule__td" key={hour}>
                {hour}
                :00
              </td>
            ))}
          </tr>
          {orders.map((order) => {
            if (!(order.startDate && order.finishDate)) {
              return (
                <tr className="schedule__tr" key={order.id}>
                  <td className="schedule__td schedule__tdTitle">
                    {order.id}
                  </td>
                  {hours.map((hour) => (
                    <td className="schedule__td" key={hour} />
                  ))}
                </tr>
              );
            }
            return (
              <tr className="schedule__tr" key={order.id}>
                <td className="schedule__td schedule__tdTitle">
                  {order.id}
                </td>
                {hours.map((hour) => (
                  <td className="schedule__td" key={hour}>{hour}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};
