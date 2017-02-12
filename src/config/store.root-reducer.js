import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import apolloClient from './apollo';
import { reducer as pages } from 'pages/pages.duck';

const rootReducer = combineReducers({
  apollo: apolloClient.reducer(),
  router: routerReducer,
  pages
});

export default rootReducer;
