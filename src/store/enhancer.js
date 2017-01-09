import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router';

const { NODE_ENV } = process.env;

const router = routerMiddleware(browserHistory);
const logger = createLogger({ collapsed: true });

const middlewares = [
  promiseMiddleware,
  thunk,
  router
];

NODE_ENV === 'development' && middlewares.push(logger);

const enhancer = applyMiddleware(...middlewares);

export default enhancer;
