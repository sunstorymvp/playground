import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import some from './some';

const rootReducer = combineReducers({
  router,
  some
});

export default rootReducer;
