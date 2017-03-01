import { combineReducers } from 'redux';

import { reducer as feedList } from './feed-list/feed-list.duck.js';

export const reducer = combineReducers({
  feedList
});
