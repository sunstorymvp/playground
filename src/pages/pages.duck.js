import { combineReducers } from 'redux';

import { reducer as feed } from './feed/feed.duck.js';

export const reducer = combineReducers({
  feed
});
