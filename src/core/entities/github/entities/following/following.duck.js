import { createActions, handleActions } from 'redux-actions';
import { mapKeys } from 'lodash';

export const actions = createActions('FETCH_GITHUB_FOLLOWING_USERS');

const initialState = {};

export const reducer = handleActions({
  [actions.fetchGithubFollowingUsers]: (state, action) => mapKeys(action.payload, 'id')
}, initialState);
