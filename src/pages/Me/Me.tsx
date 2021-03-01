import React, { useState } from 'react';
import { thunks } from '../../store/thunks';
import { ROLES } from '../../shared/constants';
import { useAppDispatch } from '../../store';
import { Button, Spinner } from '../../components/ui';
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

  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /* methods */
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(thunks.user.logout());
    setIsLoggingOut(false);
  };

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
      <div className="me__logoutFlex">
        <Button className="me__logout" onClick={handleLogout}>
          Logout
        </Button>
        <Spinner visible={isLoggingOut} />
      </div>
    </div>
  );
};
