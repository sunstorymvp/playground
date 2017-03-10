import { createActions, handleActions } from 'redux-actions';

export const actions = createActions('SET_GITHUB_USERS');

const initialState = {};

export const reducer = handleActions({
  [actions.setGithubUsers]: (state, action) => ({ ...action.payload })
}, initialState);
