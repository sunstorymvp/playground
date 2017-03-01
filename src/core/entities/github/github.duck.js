import { combineReducers } from 'redux';

import { reducer as following } from './following/following.duck';
import { reducer as starredRepositories } from './starred-repositories/starred-repositories.duck';

export const reducer = combineReducers({
  following,
  starredRepositories
});
