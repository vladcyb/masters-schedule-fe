import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { thunks } from './store/thunks';
import { getUser } from './store/userSlice/selectors';
import { PrivateRoute } from './HOCs';
import {
  LocationsPage,
  LoginPage,
  Me,
  OrdersPage,
  RegisterPage,
  ServicesPage,
  SpecializationsPage,
  MySchedulePage,
} from './pages';
import { useAppDispatch } from './store';
import { routes } from './shared/routes';
import { UserRole } from './API/interfaces';
import { Navbar } from './components/ui';
import { ManageOrders } from './pages/ManageOrders';
import { RolesMap } from './shared/types';
import './app.css';

const App = () => {
  /* loading user data from Redux */
  const {
    data: userData,
    fetched: isFetched,
    loading: isLoading,
    orders,
  } = useSelector(getUser);

  /* hooks */
  const dispatch = useAppDispatch();
  const location = useLocation();
  const prevPath = location.state ? (location.state as any).prevPath : undefined;

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

  const isLoggedIn = Boolean(userData.login);

  return (
    <div className="app">
      {isFetched ? (
        <>
          {userData.login && (
            <Navbar login={userData.login} onLogout={handleLogout} rolesMap={rolesMap} />
          )}
          <Route path="/" exact>
            <Redirect to={routes.me.root} />
          </Route>
          <PrivateRoute
            path={routes.me.root}
            exact
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <Me userData={userData} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.login.root}
            exact
            condition={!isLoggedIn}
            redirectPath={prevPath || routes.me.root}
          >
            <LoginPage isLoading={isLoading} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.orders.root}
            exact
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <OrdersPage orders={orders} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.register.root}
            exact
            condition={!isLoggedIn}
            redirectPath={routes.me.root}
          >
            <RegisterPage isLoading={isLoading} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.locations.root}
            redirectPath={routes.login.root}
            condition={isLoggedIn}
          >
            <LocationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.services.root}
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <ServicesPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.specializations.root}
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <SpecializationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.schedule.root}
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <MySchedulePage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.manageOrders.root}
            condition={isLoggedIn}
            redirectPath={routes.login.root}
          >
            <ManageOrders />
          </PrivateRoute>
        </>
      ) : null}
    </div>
  );
};

export default App;
