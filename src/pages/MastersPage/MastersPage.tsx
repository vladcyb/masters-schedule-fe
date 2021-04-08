import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMasterList } from '../../store/masterListSlice/selectors';
import { useAppDispatch } from '../../store';
import { thunks } from '../../store/thunks';
import { Container } from '../../components/ui';
import { MasterCard } from '../../components';
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
      {masters.data.map((master) => (
        <MasterCard className="mastersPage__master" master={master} key={master.id} />
      ))}
    </Container>
  );
};
