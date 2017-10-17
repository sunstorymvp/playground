import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import browserHistory from './history';

const router = routerMiddleware(browserHistory);
const logger = createLogger({ collapsed: true });

const middlewares = [ thunk, router ];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// eslint-disable-next-line no-underscore-dangle
const reduxDevtoolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = typeof reduxDevtoolsCompose === 'function' ? reduxDevtoolsCompose : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);

export default enhancer;
