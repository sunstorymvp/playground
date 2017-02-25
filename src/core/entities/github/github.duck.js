import { combineReducers } from 'redux';

import { reducer as entities } from './entities/entities.duck';

export const reducer = combineReducers({
  entities
});
