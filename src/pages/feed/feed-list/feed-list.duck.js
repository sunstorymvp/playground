import { createActions, handleActions } from 'redux-actions';

import { settingsSelector } from 'selectors/settings';
import { initFeedListQuery } from './feed-list.api';
import { actions as usersActions } from 'core/entities/github/users/users.duck';
import { actions as repositoriesActions } from 'core/entities/github/repositories/repositories.duck';
import { mapDataToGithubUsers, mapDataToGithubRepositories, mapDataToFeedList } from './feed-list.helpers';

export const actions = createActions('SET_FEED_LIST');

const initialState = {};

export const reducer = handleActions({
  [actions.setFeedList]: (state, action) => ({ ...action.payload })
}, initialState);

export const fetchFeedList = () => async (dispatch, getState) => {
  const state = getState();
  const settings = settingsSelector(state);
  const data = await initFeedListQuery({ login: settings.github.login });
  const githubUsers = mapDataToGithubUsers(data);
  const githubRepositories = mapDataToGithubRepositories(data);
  const feedList = mapDataToFeedList(data);

  dispatch(usersActions.setGithubUsers(githubUsers));
  dispatch(repositoriesActions.setGithubRepositories(githubRepositories));
  dispatch(actions.setFeedList(feedList));
};
