import React, { Fragment } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Main from './Components/Main';
import Screen from './Components/Screen';

function App() {
  return (
    <Fragment>
          <Route path='/' exact component={Main} />
          <Route path='/Screen/:id' exact component={Screen} />
    </Fragment>
 
  );
}

export default withRouter(App);
