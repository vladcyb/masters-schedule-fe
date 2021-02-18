import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from './store/authSlice/selectors';
import { PrivateRoute } from './HOCs/PrivateRoute';
import { Login, Me, Register } from './pages';

const App = () => {
  const auth = useSelector(getAuth);
  return (
    <Router>
      <Route path="/" exact>
        <Redirect to="/me" />
      </Route>
      <PrivateRoute path="/me" exact condition={auth} redirectPath="/login">
        <Me />
      </PrivateRoute>
      <PrivateRoute path="/login" exact condition={!auth} redirectPath="/me">
        <Login />
      </PrivateRoute>
      <PrivateRoute path="/register" exact condition={!auth} redirectPath="/me">
        <Register />
      </PrivateRoute>
    </Router>
  );
};

export default App;
