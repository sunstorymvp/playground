import { combineReducers } from 'redux';

import { reducer as feedList } from './feed-list/feed-list.duck';

export const reducer = combineReducers({
  feedList
});
