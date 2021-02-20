import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserThunk from './store/userSlice/thunk';
import { getUserData } from './store/userSlice/selectors';
import { PrivateRoute } from './HOCs/PrivateRoute';
import { LoginPage, Me, RegisterPage } from './pages';
import { useAppDispatch } from './store';

const App = () => {
  /* loading user data from Redux */
  const user = useSelector(getUserData);

  /* hooks */
  const dispatch = useAppDispatch();

  /* effects */
  useEffect(() => {
    dispatch(UserThunk.getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Route path="/" exact>
        <Redirect to="/me" />
      </Route>
      <PrivateRoute path="/me" exact condition={!!user.login} redirectPath="/login">
        <Me />
      </PrivateRoute>
      <PrivateRoute path="/login" exact condition={!user.login} redirectPath="/me">
        <LoginPage />
      </PrivateRoute>
      <PrivateRoute path="/register" exact condition={!user.login} redirectPath="/me">
        <RegisterPage />
      </PrivateRoute>
    </Router>
  );
};

export default App;
