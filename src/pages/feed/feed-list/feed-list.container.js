import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';

import FeedList from './feed-list.component';
import { fetchFeedList } from './feed-list.duck';
import { feedSelector } from 'selectors/github';

const mapStateToProps = (state) => ({
  feed: feedSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchFeedList }, dispatch)
});

const withState = connect(mapStateToProps, mapDispatchToProps);

class FeedListContainer extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    feed: PropTypes.array.isRequired
  }

  state = { loading: true }

  async componentDidMount() {
    await this.props.actions.fetchFeedList();

    this.setState({ loading: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isNewFeed = !isEqual(this.props.feed, nextProps.feed);
    const isNewLoadingState = this.state.loading !== nextState.loading;

    return isNewFeed || isNewLoadingState;
  }

  render() {
    return (
      <FeedList loading={ this.state.loading } feed={ this.props.feed } />
    );
  }
}

export default withState(FeedListContainer);
