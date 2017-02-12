import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { flatten, sortBy } from 'lodash';

import FeedList from './feed-list.component';
import starredRepositoriesQuery from './feed-list.graphql';
import { actions } from './feed-list.duck';

const mergeData = (followingEdge) => (repositoryEdge) => ({
  id: repositoryEdge.cursor,
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

const mapDataToProps = ({ data: { loading, user } }) => ({
  feed: loading ? [] : mapQueryData(user),
  loading
});

const mapPropsToOptions = () => ({
  pollInterval: 1000 * 60 * 5,
  variables: { githubLogin: 'sunstorymvp' }
});

const starredRepositoriesQueryOptions = {
  props: mapDataToProps,
  options: mapPropsToOptions
};

const mapStateToProps = (state) => ({
  // ...
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default compose(
  graphql(starredRepositoriesQuery, starredRepositoriesQueryOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(FeedList);
