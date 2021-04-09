import React from 'react';
import { getFullName } from '../../../../shared/methods';
import { hours } from '../../../../shared/constants';
import { MasterType } from '../../../../shared/types';
import './style.css';

type PropsType = {
  master: MasterType
  selectedHours: Map<number, boolean>
};

export const MastersScheduleRow = ({
  master,
  selectedHours,
}: PropsType) => (
  <tr className="mastersSchedule__tr" key={master.id}>
    <td className="mastersSchedule__td">{getFullName(master.user)}</td>
    {hours.map((hour) => (
      <td
        className={`mastersSchedule__td ${
          selectedHours.get(hour) ? 'mastersSchedule__td_selected' : ''
        }`}
        key={hour}
      />
    ))}
  </tr>
);
