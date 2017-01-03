import 'index.css';

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'store';
import routes from 'config/routes';

const root = document.querySelector('#root');

const app = (
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
);

render(app, root);
