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
  static mapFeed({ user }) {
    const mapResult = user.following.nodes.map((followingNode) => (
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
    const result = sortBy(flatten(mapResult), (feed) => -feed.starredAt);

    return result;
  }

  state = {
    loading: true,
    feed: []
  }

  handleReceiveData(data) {
    if (data.loading) {
      this.setState({ loading: true });
    } else if (data.error) {
      console.error(data.error);

      this.setState({ loading: false });
    } else {
      const feed = FeedListContainer.mapFeed(data);

      this.setState({ feed, loading: false });
    }
  }

  componentWillReceiveProps({ data }) {
    data && this.handleReceiveData(data);
  }

  render() {
    return (
      <FeedList loading={ this.state.loading } feed={ this.state.feed } />
    );
  }
}

export default withState(withData(FeedListContainer));
