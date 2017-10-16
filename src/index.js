import React from 'react';
import { render } from 'react-dom';

import 'index.css';
import configureStore from 'config/store';
import configureBrowserHistory from 'config/history';
import App from 'core/app';

const store = configureStore();
const browserHistory = configureBrowserHistory(store);
const app = (
  <App store={ store } browserHistory={ browserHistory } />
);
const root = document.querySelector('#root');

render(app, root);
