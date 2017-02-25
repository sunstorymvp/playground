import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { flatten, sortBy } from 'lodash';

import Feed from './feed.component';
import { settingsSelector } from 'selectors/settings';
import starredRepositoriesQuery from './feed.query.graphql';

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
});

const mergeData = (followingNode) => (repositoryEdge) => ({
  cursor: repositoryEdge.cursor,
  userName: followingNode.name,
  userAvatarURL: followingNode.avatarURL,
  starredAt: new Date(repositoryEdge.starredAt),
  repositoryURL: repositoryEdge.node.url,
  repositoryName: repositoryEdge.node.name,
  repositoryDescription: repositoryEdge.node.description
});

const mapQueryData = (user) => {
  const data = user.following.nodes.map((followingNode) => (
    followingNode.starredRepositories.edges.map(mergeData(followingNode))
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
    variables: { login: settings.github.login }
  })
};

export default compose(
  connect(mapStateToProps),
  graphql(starredRepositoriesQuery, starredRepositoriesQueryOptions)
)(Feed);
