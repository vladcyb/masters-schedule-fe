import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { hours } from '../../../shared/constants';
import { thunks } from '../../../store/thunks';
import { getMasterList } from '../../../store/masterListSlice/selectors';
import { sortMastersByFullName } from '../../../shared/methods';
import { MastersScheduleRow } from './__tr';
import './style.css';

type PropsType = {
  className?: string
};

export const MastersSchedule = ({
  className,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();
  const masters = useSelector(getMasterList).data;
  const sortedMasters = useMemo(() => masters.slice().sort(sortMastersByFullName), [masters]);

  /* state */
  const schedule = useMemo(() => {
    const sch = new Map<number, Map<number, boolean>>();

    sortedMasters.forEach((master) => {
      const masterSchedule = new Map<number, boolean>();
      hours.forEach((hour) => {
        masterSchedule.set(hour, Boolean(hour % 2));
      });
      sch.set(master.id, masterSchedule);
    });
    return sch;
  }, [sortedMasters]);

  /* effects */
  useEffect(() => {
    dispatch(thunks.masters.update());
  }, [dispatch]);

  return (
    <div className={`mastersSchedule ${className || ''}`}>
      <div className="mastersSchedule__title">
        Мастера
      </div>
      <table className="mastersSchedule__table">
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
            <MastersScheduleRow
              master={master}
              key={master.id}
              selectedHours={schedule.get(master.id)!}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
