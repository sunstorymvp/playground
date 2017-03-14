import { createActions, handleActions } from 'redux-actions';

import { settingsSelector } from 'core/settings/settings.selectors';
import { repositorySelector } from 'core/entities/github/github.selectors';
import { feedDataItemSelector } from './feed.selectors';
import { initFeedQuery } from './feed.api';
import { actions as usersActions } from 'core/entities/github/users/users.duck';
import { actions as repositoriesActions } from 'core/entities/github/repositories/repositories.duck';
import { mapDataToGithubUsers, mapDataToGithubRepositories, mapDataToFeedData } from './feed.helpers';

export const actions = createActions(
  'FEED_REQUEST',
  'FEED_REQUEST_SUCCESS',
  'FEED_REQUEST_FAILURE',
  'PREVIEW_REQUEST',
  'PREVIEW_REQUEST_SUCCESS',
  'PREVIEW_REQUEST_FAILURE'
);

const initialState = {
  feedData: null,
  feedLoading: false,
  previewData: null,
  previewLoading: false
};

export const reducer = handleActions({
  [actions.feedRequest]: (state) => ({
    ...state,
    feedLoading: true
  }),
  [actions.feedRequestSuccess]: (state, action) => ({
    ...state,
    feedData: action.payload,
    feedLoading: false
  }),
  [actions.feedRequestFailure]: (state) => ({
    ...state,
    feedData: null,
    feedLoading: false
  }),
  [actions.previewRequest]: (state) => ({
    ...state,
    previewLoading: true
  }),
  [actions.previewRequestSuccess]: (state, action) => ({
    ...state,
    previewData: action.payload,
    previewLoading: false
  }),
  [actions.previewRequestFailure]: (state) => ({
    ...state,
    previewData: null,
    previewLoading: false
  })
}, initialState);

export const fetchFeed = () => async (dispatch, getState) => {
  dispatch(actions.feedRequest());

  const state = getState();
  const settings = settingsSelector(state);

  try {
    const data = await initFeedQuery({ login: settings.github.login });
    const githubUsers = mapDataToGithubUsers(data);
    const githubRepositories = mapDataToGithubRepositories(data);
    const feedData = mapDataToFeedData(data);

    dispatch(usersActions.setGithubUsers(githubUsers));
    dispatch(repositoriesActions.setGithubRepositories(githubRepositories));
    dispatch(actions.feedRequestSuccess(feedData));
  } catch (error) {
    dispatch(actions.feedRequestFailure(error));
  }
};

export const fetchPreview = (feedItemId) => async (dispatch, getState) => {
  dispatch(actions.previewRequest());

  const state = getState();
  const { repositoryId } = feedDataItemSelector(state, feedItemId);
  const repository = repositorySelector(state, repositoryId);

  try {
    const data = await fetch(`https://api.github.com/repos/${ repository.owner.login }/${ repository.name }/readme`);
    const json = await data.json();
    const previewData = {
      readme: json.content,
      feedItemId
    };

    dispatch(actions.previewRequestSuccess(previewData));
  } catch (error) {
    dispatch(actions.previewRequestFailure(error));
  }
};
