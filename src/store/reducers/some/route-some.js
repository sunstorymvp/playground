import { handleActions } from 'redux-actions';
import { includes } from 'lodash';

import { LOCATION_CHANGE } from 'config/constants.actions';

const initialState = false;

const routeSome = handleActions({
  [LOCATION_CHANGE]: (state, action) => (
    includes([ '/some' ], action.payload.pathname)
  )
}, initialState);

export default routeSome;
