import React, { useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { Container } from '../../components/ui';
import { OrdersSchedule } from './OrdersSchedule';
import { dateFormat } from '../../shared/constants';
import { MastersSchedule } from './MastersSchedule';
import './style.css';

export const SchedulePage = () => {
  /* state */
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), dateFormat));

  /* methods */
  const decrementDate = () => {
    setSelectedDate((oldValue) => format(addDays(parseISO(oldValue), -1), dateFormat));
  };

  const incrementDate = () => {
    setSelectedDate((oldValue) => format(addDays(parseISO(oldValue), 1), dateFormat));
  };

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
      <OrdersSchedule selectedDate={selectedDate} />
      <MastersSchedule className="schedulePage__masters" />
    </Container>
  );
};
