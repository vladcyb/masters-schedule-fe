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
            condition={!!userData.login && userData.role === UserRole.CLIENT}
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
            condition={!!userData.login && userData.role === UserRole.ADMIN}
          >
            <LocationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.services.root}
            condition={!!userData.login && userData.role === UserRole.ADMIN}
            redirectPath={routes.me.root}
          >
            <ServicesPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.specializations.root}
            condition={!!userData.login && userData.role === UserRole.ADMIN}
            redirectPath={routes.me.root}
          >
            <SpecializationsPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.schedule.root}
            condition={!!userData.login && userData.role === UserRole.MASTER}
            redirectPath={routes.me.root}
          >
            <MySchedulePage />
          </PrivateRoute>
        </Router>
      ) : null}
    </div>
  );
};

export default App;
