import { createActions, handleActions } from 'redux-actions';

export const actions = createActions('UPDATE_GITHUB_FOLLOWING');

const initialState = {};

export const reducer = handleActions({
  [actions.updateGithubFollowing]: (state, action) => ({ ...state, ...action.payload })
}, initialState);
