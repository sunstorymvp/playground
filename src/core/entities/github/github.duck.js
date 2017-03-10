import { combineReducers } from 'redux';

import { reducer as users } from './users/users.duck';
import { reducer as repositories } from './repositories/repositories.duck';

export const reducer = combineReducers({
  users,
  repositories
});
