import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import LazyComponent from 'shared/lazy-component';
import Feed from 'pages/feed';

const AppRouter = ({ browserHistory }) => (
  <ConnectedRouter history={ browserHistory }>
    <Switch>
      <Route path="/" exact component={ Feed } />
      <Route path="/settings" component={ LazyComponent.wrap('pages/settings') } />
    </Switch>
  </ConnectedRouter>
);

AppRouter.propTypes = {
  browserHistory: PropTypes.object.isRequired
};

export default AppRouter;
