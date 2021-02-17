import React from 'react';
import Me from './pages/Me/Me';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';

const App = () => (
  <Router>
    <Route path="/" exact>
      <Redirect to="/me" />
    </Route>
    <Route path="/me">
      <Me />
    </Route>
  </Router>
);

export default App;
