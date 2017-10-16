import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as settings } from 'core/settings/settings.duck';
import { reducer as entities } from 'core/entities/entities.duck';

const rootReducer = combineReducers({
  router: routerReducer,
  settings,
  entities
});

export default rootReducer;
