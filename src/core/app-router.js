import React, { PropTypes } from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import LazyComponent from 'shared/lazy-component';
import Feed from 'pages/feed';

const AppRouter = ({ browserHistory }) => (
  <Router history={ browserHistory }>
    <Route path="/">
      <IndexRoute component={ Feed } />
      <Route path="settings" component={ LazyComponent.wrap('pages/settings') } />
    </Route>
  </Router>
);

AppRouter.propTypes = {
  browserHistory: PropTypes.object.isRequired
};

export default AppRouter;
