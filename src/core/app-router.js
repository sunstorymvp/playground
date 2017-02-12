import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';

import LazyComponent from 'shared/lazy-component';

const wrapLazyComponent = (path) => (
  () => <LazyComponent path={ path } />
);

const AppRouter = ({ browserHistory }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ wrapLazyComponent('pages/feed') } />
  </Router>
);

AppRouter.propTypes = {
  browserHistory: PropTypes.object.isRequired
};

export default AppRouter;
