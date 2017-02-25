import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import promise from 'redux-promise';
import { browserHistory } from 'react-router';

import client from './apollo';

const { NODE_ENV } = process.env;

const router = routerMiddleware(browserHistory);
const logger = createLogger({ collapsed: true });
const apollo = client.middleware();

const middlewares = [ promise, thunk, router, apollo ];

NODE_ENV === 'development' && middlewares.push(logger);

const enhancer = applyMiddleware(...middlewares);

export default enhancer;