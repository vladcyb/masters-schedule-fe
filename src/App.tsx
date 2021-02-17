import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Me } from './pages/Me';
import { getToken } from './store/userSlice/selectors';
import { PrivateRoute } from './HOCs/PrivateRoute';
import { Login } from './pages/Login';

const App = () => {
  const token = useSelector(getToken);
  return (
    <Router>
      <Route path="/" exact>
        <Redirect to="/me" />
      </Route>
      <PrivateRoute path="/me" exact condition={!!token} redirectPath="/login">
        <Me />
      </PrivateRoute>
      <PrivateRoute path="/login" exact condition={!token} redirectPath="/me">
        <Login />
      </PrivateRoute>
    </Router>
  );
};

export default App;
