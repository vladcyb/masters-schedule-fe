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
      <tr className="schedulePage__tr" key={id}>
        <td className="schedulePage__td schedulePage__tdBold">
          {`Заказ ${id}`}
        </td>
        {hours.map((hour) => (
          <td className="schedulePage__td" key={hour} />
        ))}
      </tr>
    );
  }
  /* =========================================================== */

  return (
    <tr className="schedulePage__tr" key={id}>
      <td className="schedulePage__td schedulePage__tdBold">
        {`Заказ ${id}`}
      </td>
      {hours.map((hour) => {
        const cellDate = parseISO(`${selectedDate}T${hour}:00`);
        const classes = `schedulePage__td ${
          (isAfter(cellDate, parseISO(startDate)) || isEqual(cellDate, parseISO(startDate)))
          && (isBefore(cellDate, parseISO(finishDate)))
            ? 'schedulePage__td_selected' : ''
        }`;
        return (
          <td className={classes} key={hour} />
        );
      })}
    </tr>
  );
};
