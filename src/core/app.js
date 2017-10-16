import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AppRouter from './app-router';

const App = ({ store, browserHistory }) => (
  <Provider store={ store }>
    <AppRouter browserHistory={ browserHistory } />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default App;
