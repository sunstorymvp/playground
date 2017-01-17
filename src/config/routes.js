import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LazyComponent from 'shared/lazy-component';

const wrapLazyComponent = (path) => (
  () => <LazyComponent path={ path } />
);

const routes = (
  <Route path="/">
    <IndexRoute component={ wrapLazyComponent('home') } />
    <Route path="some" component={ wrapLazyComponent('some') } />
  </Route>
);

export default routes;
