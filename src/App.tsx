import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
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

  /* effects */
  useEffect(() => {
    dispatch(thunks.user.getMe());
  }, [dispatch]);

  /* methods */
  const handleLogout = () => {
    dispatch(thunks.user.logout());
  };

  const isClient = userData.role === UserRole.CLIENT;
  const isMaster = userData.role === UserRole.MASTER;
  const isOperator = userData.role === UserRole.OPERATOR;
  const isAdmin = userData.role === UserRole.ADMIN;
  // const isResponsible = userData.role === UserRole.RESPONSIBLE;

  return (
    <div className="app">
      {isFetched ? (
        <Router>
          {userData.login && <Navbar userData={userData} onLogout={handleLogout} />}
          <Route path="/" exact>
            <Redirect to={routes.me.root} />
          </Route>
          <PrivateRoute
            path={routes.me.root}
            exact
            condition={!!userData.login}
            redirectPath={routes.login.root}
          >
            <Me userData={userData} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.login.root}
            exact
            condition={!userData.login}
            redirectPath={routes.me.root}
          >
            <LoginPage isLoading={isLoading} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.orders.root}
            exact
            condition={!!userData.login && (isClient || isMaster)}
            redirectPath={routes.login.root}
          >
            <OrdersPage orders={orders} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.register.root}
            exact
            condition={!userData.login}
            redirectPath={routes.me.root}
          >
            <RegisterPage isLoading={isLoading} />
          </PrivateRoute>
          <PrivateRoute
            path={routes.locations.root}
            redirectPath={routes.me.root}
            condition={!!userData.login && isAdmin}
          >
            <LocationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.services.root}
            condition={!!userData.login && isAdmin}
            redirectPath={routes.me.root}
          >
            <ServicesPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.specializations.root}
            condition={!!userData.login && isAdmin}
            redirectPath={routes.me.root}
          >
            <SpecializationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.schedule.root}
            condition={!!userData.login && isMaster}
            redirectPath={routes.me.root}
          >
            <MySchedulePage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.manageOrders.root}
            redirectPath={routes.me.root}
            condition={isOperator}
          >
            <ManageOrders />
          </PrivateRoute>
        </Router>
      ) : null}
    </div>
  );
};

export default App;
