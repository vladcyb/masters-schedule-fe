import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpecializationsThunk from '../../store/specializationSlice/thunk';
import { getSpecializations } from '../../store/specializationSlice/selectors';
import { useAppDispatch } from '../../store';
import { Specialization } from '../../components/Specialization';
import './style.css';

export const SpecializationsPage = () => {
  /* hooks */
  const specializations = useSelector(getSpecializations);
  const dispatch = useAppDispatch();
  console.log(specializations);

  /* effects */
  useEffect(() => {
    dispatch(SpecializationsThunk.update());
  }, [dispatch]);
  return (
    <div className="specializationsPage">
      <div className="specializationsPage__list">
        {specializations.data.map((item) => (
          <Specialization
            className="specializationsPage__item"
            specialization={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
