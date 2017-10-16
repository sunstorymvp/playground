import { createActions, handleActions } from 'redux-actions';
import { merge } from 'lodash';

export const actions = createActions('UPDATE_SETTINGS');

const initialState = {};

export const reducer = handleActions({
  [actions.updateSettings]: (state, action) => merge({}, state, action.payload)
}, initialState);
