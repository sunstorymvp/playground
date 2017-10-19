import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import LazyComponent from 'shared/lazy-component';
import Feed from 'features/feed';

const App = ({ store, browserHistory }) => (
  <Provider store={ store }>
    <ConnectedRouter history={ browserHistory }>
      <Switch>
        <Route path="/" exact component={ Feed } />
        <Route path="/settings" component={ LazyComponent.wrap('features/settings') } />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default App;
