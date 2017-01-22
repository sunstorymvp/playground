import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import apolloClient from 'config/apollo';
import some from './some';

const rootReducer = combineReducers({
  apollo: apolloClient.reducer(),
  router: routerReducer,
  some
});

export default rootReducer;
