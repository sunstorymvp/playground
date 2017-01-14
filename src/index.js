import 'index.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'store';
import routes from 'config/routes';

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

const app = (
  <Provider store={ store }>
    <Router history={ history } routes={ routes } />
  </Provider>
);

const root = document.querySelector('#root');

render(app, root);
