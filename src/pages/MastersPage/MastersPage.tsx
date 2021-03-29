import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMasterList } from '../../store/masterListSlice/selectors';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
import { Card, Container } from '../../components/ui';
import './style.css';

export const MastersPage = () => {
  /* hooks */
  const masters = useSelector(getMasterList);
  const dispatch = useAppDispatch();

  /* effects */
  useEffect(() => {
    dispatch(thunks.masters.update());
  }, [dispatch]);

  return (
    <Container className="mastersPage">
      {masters.data.map((item) => (
        <Card className="mastersPage__master" key={item.id}>
          <div className="mastersPage__row">
            <span className="mastersPage__fieldName">ФИО: </span>
            <span className="mastersPage__fieldContent">
              {`${item.user.surname} ${item.user.name} ${item.user.patronymic}`}
            </span>
          </div>
          <div className="mastersPage__row">
            <span className="mastersPage__fieldName">Специализации: </span>
            <span className="mastersPage__fieldContent">
              {item.specializations.map((specialization) => (
                `${specialization.title}; `
              ))}
            </span>
          </div>
        </Card>
      ))}
    </Container>
  );
};
