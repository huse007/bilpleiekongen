// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
//import Home from './Home/Home';
import Callback from './callback/Callback';
import Auth from './auth/Auth';
import history from './history';

import Products from './components/Products';
import Minside from './components/Minside';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
	  <div>
	  <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/Produkter" render={(props) => <Products auth={auth} {...props} />} />
          <Route path="/Min side" render={(props) => <Minside auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
          }}/>
	  </div>
	  </Router>
  );
}
