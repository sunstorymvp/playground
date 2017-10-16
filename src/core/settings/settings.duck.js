import { createActions, handleActions } from 'redux-actions';

export const actions = createActions('UPDATE_SETTINGS');

const initialState = {};

export const reducer = handleActions({
  [actions.updateSettings]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initialState);
