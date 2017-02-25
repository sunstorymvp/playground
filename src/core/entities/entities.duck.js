import { combineReducers } from 'redux';

import { reducer as github } from './github/github.duck';

export const reducer = combineReducers({
  github
});
