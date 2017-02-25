import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { flatten, sortBy } from 'lodash';

import Feed from './feed.component';
import { settingsSelector } from 'selectors/settings';
import starredRepositoriesQuery from './feed.query.graphql';

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
});

const mergeData = (followingEdge) => (repositoryEdge) => ({
  cursor: repositoryEdge.cursor,
  userName: followingEdge.node.name,
  userAvatarURL: followingEdge.node.avatarURL,
  starredAt: new Date(repositoryEdge.starredAt),
  repositoryURL: repositoryEdge.node.url,
  repositoryName: repositoryEdge.node.name,
  repositoryDescription: repositoryEdge.node.description
});

const mapQueryData = (user) => {
  const data = user.following.edges.map((followingEdge) => (
    followingEdge.node.starredRepositories.edges.map(mergeData(followingEdge))
  ));
  const flattenData = flatten(data);
  const sortedData = sortBy(flattenData, (feed) => -feed.starredAt);

  return sortedData;
};

const starredRepositoriesQueryOptions = {
  props: ({ data: { loading, user } }) => ({
    feed: loading ? [] : mapQueryData(user),
    loading
  }),
  options: ({ settings }) => ({
    pollInterval: settings.github.pollInterval,
    variables: { githubLogin: settings.github.login }
  })
};

export default compose(
  connect(mapStateToProps),
  graphql(starredRepositoriesQuery, starredRepositoriesQueryOptions)
)(Feed);
