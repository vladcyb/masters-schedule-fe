import React from 'react';
import { hours } from '../../../shared/constants';
import './style.css';

type PropsType = {
  id: number
  startDate: string | null
  finishDate: string | null
};

export const ScheduleCell = ({
  id,
  startDate,
  finishDate,
}: PropsType) => {
  /* Если не указана дата начала или окончания выполнения заказа */
  if (!(startDate && finishDate)) {
    return (
      <tr className="schedule__tr" key={id}>
        <td className="schedule__td schedule__tdBold">
          {id}
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
        {id}
      </td>
      {hours.map((hour) => (
        <td className="schedule__td" key={hour}>{hour}</td>
      ))}
    </tr>
  );
};
