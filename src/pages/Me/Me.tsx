import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserThunk from '../../store/userSlice/thunk';
import { getUserData } from '../../store/userSlice/selectors';
import { ROLES } from '../../shared/constants';
import { useAppDispatch } from '../../store';
import { Button, Spinner, Navbar } from '../../components/ui';
import './style.css';

export const Me = () => {
  /* hooks */
  const {
    name,
    surname,
    role,
    patronymic,
  } = useSelector(getUserData);

  /* vars */
  const roleTitle = ROLES.find((item) => item.value === role)!.title;

  /* hooks */
  const dispatch = useAppDispatch();

  /* state */
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /* methods */
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(UserThunk.logout());
    setIsLoggingOut(false);
  };

  return (
    <div className="me">
      <Navbar />
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
