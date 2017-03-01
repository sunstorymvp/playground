import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import client from './apollo';
import { reducer as settings } from 'core/settings/settings.duck';
import { reducer as entities } from 'core/entities/entities.duck';
import { reducer as pages } from 'pages/pages.duck';

const rootReducer = combineReducers({
  apollo: client.reducer(),
  router: routerReducer,
  settings,
  entities,
  pages
});

export default rootReducer;
