import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const { NODE_ENV } = process.env;

const router = routerMiddleware(browserHistory);
const logger = createLogger({ collapsed: true });

const middlewares = [ thunk, router ];

NODE_ENV === 'development' && middlewares.push(logger);

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);

export default enhancer;
