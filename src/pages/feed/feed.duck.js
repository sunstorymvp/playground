import { combineReducers } from 'redux';

import { reducer as feedList } from './feed-list/feed-list.duck';

const reducer = combineReducers({
  feedList
});

export { reducer };
