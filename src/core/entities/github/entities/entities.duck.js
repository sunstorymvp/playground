import { combineReducers } from 'redux';

import { reducer as following } from './following/following.duck';

export const reducer = combineReducers({
  following
});
