import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { hours } from '../../../shared/constants';
import { thunks } from '../../../store/thunks';
import { getMasterList } from '../../../store/masterListSlice/selectors';
import { getFullName, sortMastersByFullName } from '../../../shared/methods';
import './style.css';

type PropsType = {
  selectedDate: string
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MastersSchedule = ({ selectedDate }: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();

  const masters = useSelector(getMasterList).data;
  const sortedMasters = useMemo(() => masters.slice().sort(sortMastersByFullName), [masters]);
  console.log('[MastersSchedule]');

  /* effects */
  useEffect(() => {
    dispatch(thunks.masters.update());
  }, [dispatch]);

  return (
    <table className="mastersSchedule">
      <tbody>
        <tr className="mastersSchedule__tr">
          <td className="mastersSchedule__td">
            Мастер
          </td>
          {hours.map((hour) => (
            <td className="mastersSchedule__td" key={hour}>
              {hour}
              :00
            </td>
          ))}
        </tr>
        {sortedMasters.map((master) => (
          <tr className="mastersSchedule__tr" key={master.id}>
            <td className="mastersSchedule__td">{getFullName(master.user)}</td>
            {hours.map((hour) => (
              <td className="mastersSchedule__td" key={hour} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
