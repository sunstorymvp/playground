import React from 'react';
import { Route } from 'react-router';

import AsyncComponent from './async-component';

const getComponent = (path) => (
  () => <AsyncComponent path={ path } />
);

const routes = (
  <Route path="/" component={ getComponent('home') } />
);

export default routes;
