import { createActions, handleActions } from 'redux-actions';
import { mapKeys, merge, omit } from 'lodash';

import client from 'config/apollo';
import followingQuery from './following.query.graphql';
import { settingsSelector } from 'selectors/settings';

export const actions = createActions('FETCH_GITHUB_FOLLOWING_USERS');

const initialState = {};

export const reducer = handleActions({
  [actions.fetchGithubFollowingUsers]: (state, action) => {
    const payload = action.payload.reduce((result, data) => {
      const { nodes } = data.user.following;

      nodes.forEach((node) => result.push(omit(node, '__typename')));

      return result;
    }, []);

    return mapKeys(payload, 'id');
  }
}, initialState);

export const fetchGithubFollowingUsers = () => (dispatch, getState) => {
  const state = getState();
  const settings = settingsSelector(state);
  const data = [];

  const query = async (params) => {
    const result = await client.query(merge({
      query: followingQuery,
      variables: { login: settings.github.login }
    }, params));

    data.push(result.data);

    const { hasNextPage, endCursor } = result.data.user.following.pageInfo;

    if (hasNextPage) {
      return query({
        variables: { cursor: endCursor }
      });
    } else {
      return dispatch(actions.fetchGithubFollowingUsers(data));
    }
  };

  return query();
};
