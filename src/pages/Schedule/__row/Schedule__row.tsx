import React from 'react';
import {
  isAfter, isBefore, isEqual, parseISO,
} from 'date-fns';
import { hours } from '../../../shared/constants';
import './style.css';

type PropsType = {
  id: number
  startDate: string | null
  finishDate: string | null
  selectedDate: string
};

export const ScheduleRow = ({
  id,
  startDate,
  finishDate,
  selectedDate,
}: PropsType) => {
  /* Если не указана дата начала или окончания выполнения заказа */
  if (!(startDate && finishDate)) {
    return (
      <tr className="schedule__tr" key={id}>
        <td className="schedule__td schedule__tdBold">
          {`Заказ ${id}`}
        </td>
        {hours.map((hour) => (
          <td className="schedule__td" key={hour} />
        ))}
      </tr>
    );
  }
  /* =========================================================== */

  return (
    <tr className="schedule__tr" key={id}>
      <td className="schedule__td schedule__tdBold">
        {`Заказ ${id}`}
      </td>
      {hours.map((hour) => {
        const cellDate = parseISO(`${selectedDate}T${hour}:00`);
        const classes = `schedule__td ${
          (isAfter(cellDate, parseISO(startDate)) || isEqual(cellDate, parseISO(startDate)))
          && (isBefore(cellDate, parseISO(finishDate)))
            ? 'schedule__td_selected' : ''
        }`;
        return (
          <td className={classes} key={hour} />
        );
      })}
    </tr>
  );
};
