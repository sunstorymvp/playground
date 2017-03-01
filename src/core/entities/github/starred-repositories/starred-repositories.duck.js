import { createActions, handleActions } from 'redux-actions';
import { mapKeys, merge, omit } from 'lodash';

import client from 'config/apollo';
import starredRepositoriesQuery from './starred-repositories.query.graphql';
import { followingLoginsSelector } from 'selectors/github';

export const actions = createActions('FETCH_GITHUB_STARRED_REPOSITORIES');

const initialState = {};

export const reducer = handleActions({
  [actions.fetchGithubStarredRepositories]: (state, action) => {
    const payload = action.payload.reduce((result, data) => {
      const { id } = data.user;
      const { edges } = data.user.starredRepositories;

      edges.forEach(({ node, ...props }) => (
        result.push(omit({ ...node, ...props, starredBy: id }, '__typename'))
      ));

      return result;
    }, []);

    return mapKeys(payload, 'id');
  }
}, initialState);

export const fetchGithubStarredRepositories = () => (dispatch, getState) => {
  const state = getState();
  const logins = followingLoginsSelector(state);
  const data = [];

  const query = async (params) => {
    const result = await client.query(merge({
      query: starredRepositoriesQuery
    }, params));

    data.push(result.data);
  };

  const queries = logins.map((login) => query({
    variables: { login }
  }));

  return Promise.all(queries).then(() => dispatch(actions.fetchGithubStarredRepositories(data)));
};
