import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Page0 from './pages/Page0';
import RandIndex from './pages/RandIndex';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact={true} path='/' component={Page0} />
          <Route path='/randindex' component={RandIndex} />
          <Route component={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
