import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserThunk from './store/userSlice/thunk';
import { getIsUserFetched, getUserData } from './store/userSlice/selectors';
import { PrivateRoute } from './HOCs/PrivateRoute';
import {
  LoginPage, Me, RegisterPage, OrdersPage, LocationsPage,
} from './pages';
import { useAppDispatch } from './store';
import { routes } from './shared/routes';
import { UserRole } from './API/interfaces';
import { Navbar } from './components/ui';
import './app.css';

const App = () => {
  /* loading user data from Redux */
  const user = useSelector(getUserData);
  const isUserFetched = useSelector(getIsUserFetched);

  /* hooks */
  const dispatch = useAppDispatch();

  /* effects */
  useEffect(() => {
    dispatch(UserThunk.getMe());
  }, [dispatch]);

  return (
    <div className="app">
      {isUserFetched ? (
        <Router>
          <Navbar user={user} />
          <Route path="/" exact>
            <Redirect to={routes.me.root} />
          </Route>
          <PrivateRoute
            path={routes.me.root}
            exact
            condition={!!user.login}
            redirectPath={routes.login.root}
          >
            <Me />
          </PrivateRoute>
          <PrivateRoute
            path={routes.login.root}
            exact
            condition={!user.login}
            redirectPath={routes.me.root}
          >
            <LoginPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.orders.root}
            exact
            condition={!!user.login}
            redirectPath={routes.login.root}
          >
            <OrdersPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.register.root}
            exact
            condition={!user.login}
            redirectPath={routes.me.root}
          >
            <RegisterPage />
          </PrivateRoute>
          <PrivateRoute
            path={routes.locations.root}
            redirectPath={routes.me.root}
            condition={!!user.login && user.role === UserRole.ADMIN}
          >
            <LocationsPage />
          </PrivateRoute>
        </Router>
      ) : null}
    </div>
  );
};

export default App;
