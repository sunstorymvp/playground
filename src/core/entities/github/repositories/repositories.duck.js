import { createActions, handleActions } from 'redux-actions';

export const actions = createActions('SET_GITHUB_REPOSITORIES');

const initialState = {};

export const reducer = handleActions({
  [actions.setGithubRepositories]: (state, action) => ({ ...action.payload })
}, initialState);
