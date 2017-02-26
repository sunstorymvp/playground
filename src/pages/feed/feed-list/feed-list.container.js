import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { flatten, sortBy } from 'lodash';

import FeedList from './feed-list.component';
import { settingsSelector } from 'selectors/settings';
import starredRepositoriesQuery from './feed-list.query.graphql';

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
});

const withState = connect(mapStateToProps);

const withData = graphql(starredRepositoriesQuery, {
  options: ({ settings }) => ({
    pollInterval: settings.github.pollInterval,
    variables: { login: settings.github.login }
  })
});

class FeedListContainer extends Component {
  state = {
    loading: true,
    feed: []
  }

  static mapFeed({ user }) {
    const data = user.following.nodes.map((followingNode) => (
      followingNode.starredRepositories.edges.map((repositoryEdge) => ({
        cursor: repositoryEdge.cursor,
        userName: followingNode.name,
        userAvatarURL: followingNode.avatarURL,
        starredAt: new Date(repositoryEdge.starredAt),
        repositoryURL: repositoryEdge.node.url,
        repositoryName: repositoryEdge.node.name,
        repositoryDescription: repositoryEdge.node.description
      }))
    ));
    const flattenData = flatten(data);
    const sortedData = sortBy(flattenData, (feed) => -feed.starredAt);

    return sortedData;
  }

  componentWillReceiveProps({ data }) {
    const feed = FeedListContainer.mapFeed(data);

    this.setState({ feed, loading: data.loading });
  }

  render() {
    return (
      <FeedList loading={ this.state.loading } feed={ this.state.feed } />
    );
  }
}

export default withState(withData(FeedListContainer));
