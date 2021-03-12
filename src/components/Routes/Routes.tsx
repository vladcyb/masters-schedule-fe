import React from 'react';
import {
  Redirect, Route, useLocation, Switch,
} from 'react-router-dom';
import { routes } from '../../shared/routes';
import { PrivateRoute } from '../../HOCs';
import {
  LocationsPage,
  LoginPage,
  Me, MySchedulePage,
  OrdersPage,
  RegisterPage,
  ServicesPage,
  SpecializationsPage,
  NotFoundPage,
} from '../../pages';
import { UserRole } from '../../API/interfaces';
import { StateType as UserState } from '../../store/userSlice/types';
import { AdministrationPage } from '../../pages/AdministrationPage';

type PropsType = {
  user: UserState
};

export const Routes = ({ user }: PropsType) => {
  /* hooks */
  const location = useLocation();
  const prevPath = location.state ? (location.state as any).prevPath : undefined;

  const {
    data: userData,
    loading: isLoading,
    orders,
  } = user;
  const { login, role } = userData;
  const isLoggedIn = Boolean(login);

  return (
    <Switch>
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
        path={routes.administration.locations.root}
        redirectPath={routes.login.root}
        condition={isLoggedIn}
        allowedRoles={[UserRole.ADMIN]}
        role={role}
      >
        <LocationsPage />
      </PrivateRoute>
      <PrivateRoute
        path={routes.administration.services.root}
        condition={isLoggedIn}
        redirectPath={routes.login.root}
        allowedRoles={[UserRole.ADMIN]}
        role={role}
      >
        <ServicesPage />
      </PrivateRoute>
      <PrivateRoute
        path={routes.administration.specializations.root}
        condition={isLoggedIn}
        redirectPath={routes.login.root}
        allowedRoles={[UserRole.ADMIN]}
        role={role}
      >
        <SpecializationsPage />
      </PrivateRoute>
      <PrivateRoute
        path={routes.schedule.root}
        condition={isLoggedIn}
        redirectPath={routes.login.root}
        allowedRoles={[UserRole.ADMIN, UserRole.OPERATOR, UserRole.MASTER]}
        role={role}
      >
        <MySchedulePage />
      </PrivateRoute>
      <PrivateRoute
        path={routes.administration.root}
        condition={isLoggedIn}
        redirectPath={routes.login.root}
        allowedRoles={[UserRole.ADMIN]}
        role={role}
      >
        <AdministrationPage />
      </PrivateRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
