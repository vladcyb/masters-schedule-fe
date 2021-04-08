import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { thunks } from './store/thunks';
import { getUser } from './store/userSlice/selectors';
import { useAppDispatch } from './store';
import { UserRole } from './API/interfaces';
import { Navbar } from './components/ui';
import { RolesMap } from './shared/types';
import { Routes } from './components/Routes';
import { getOrders } from './store/orderSlice/selectors';
import './app.css';

const App = () => {
  /* loading user data from Redux */
  const user = useSelector(getUser);
  const {
    data: userData,
    fetched: isFetched,
  } = user;
  const orders = useSelector(getOrders);

  /* hooks */
  const dispatch = useAppDispatch();

  /* effects */
  useEffect(() => {
    dispatch(thunks.user.getMe());
  }, [dispatch]);

  /* methods */
  const handleLogout = () => {
    dispatch(thunks.user.logout());
  };

  const { role } = userData;

  const rolesMap: RolesMap = {
    isClient: role === UserRole.CLIENT,
    isMaster: role === UserRole.MASTER,
    isOperator: role === UserRole.OPERATOR,
    isAdmin: role === UserRole.ADMIN,
    isResponsible: role === UserRole.RESPONSIBLE,
  };

  return (
    <div className="app">
      {isFetched ? (
        <>
          {userData.login && (
            <Navbar login={userData.login} onLogout={handleLogout} rolesMap={rolesMap} />
          )}
          <Routes user={user} orders={orders} />
        </>
      ) : null}
    </div>
  );
};

export default App;
