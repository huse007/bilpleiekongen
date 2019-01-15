import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import {BrowserRouter } from 'react-router-dom';
//import { makeMainRoutes } from './routes';
import Auth from './auth/Auth';
const auth = new Auth();
//const routes = makeMainRoutes();

ReactDOM.render(<App auth={auth}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//registerServiceWorker();
