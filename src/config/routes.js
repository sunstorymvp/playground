import React from 'react';
import { Route } from 'react-router';

import LazyComponent from 'shared/lazy-component';

const getComponent = (path) => (
  () => <LazyComponent path={ path } />
);

const routes = (
  <Route path="/" component={ getComponent('home') } />
);

export default routes;
