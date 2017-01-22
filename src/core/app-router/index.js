import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import LazyComponent from 'shared/components/lazy-component';

const wrapLazyComponent = (path) => (
  () => <LazyComponent path={ path } />
);

const AppRouter = ({ browserHistory }) => (
  <Router history={ browserHistory }>
    <Route path="/">
      <IndexRoute component={ wrapLazyComponent('home') } />
      <Route path="some" component={ wrapLazyComponent('some') } />
    </Route>
  </Router>
);

AppRouter.propTypes = {
  browserHistory: PropTypes.object.isRequired
};

export default AppRouter;
