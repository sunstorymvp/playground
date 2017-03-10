import { combineReducers } from 'redux';

import { reducer as feed } from './feed/feed.duck';

export const reducer = combineReducers({
  feed
});
