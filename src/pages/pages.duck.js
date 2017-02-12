import { combineReducers } from 'redux';

import { reducer as feed } from './feed/feed.duck';

const reducer = combineReducers({
  feed
});

export { reducer };
