import { createActions, handleActions } from 'redux-actions';

import { fetchGithubFollowingUsers } from 'core/entities/github/following/following.duck';
import { fetchGithubStarredRepositories } from 'core/entities/github/starred-repositories/starred-repositories.duck';

export const actions = createActions('FETCH_GITHUB_FEED');

const initialState = {};

export const reducer = handleActions({
  [actions.fetchGithubFeed]: (state) => state
}, initialState);

export const fetchGithubFeed = () => async (dispatch, getState) => {
  await fetchGithubFollowingUsers()(dispatch, getState);
  await fetchGithubStarredRepositories()(dispatch, getState);

  dispatch(actions.fetchGithubFeed());
};
