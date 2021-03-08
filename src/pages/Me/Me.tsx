import React from 'react';
import { ROLES } from '../../shared/constants';
import { UserDataStateType } from '../../store/userSlice/types';
import './style.css';

type PropsType = {
  userData: UserDataStateType
};

export const Me = ({ userData }: PropsType) => {
  /* hooks */
  const {
    name,
    surname,
    role,
    patronymic,
  } = userData;

  /* vars */
  const roleTitle = ROLES.find((item) => item.value === role)!.title;

  return (
    <div className="me">
      <div className="me__surname">
        {surname}
      </div>
      <div className="me__name">
        {name}
        {' '}
        {patronymic}
      </div>
      <div className="me__role">
        {roleTitle}
      </div>
    </div>
  );
};
