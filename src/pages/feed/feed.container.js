import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omit } from 'lodash';

import Feed from './feed.component';
import { fetchFeed, fetchPreview } from './feed.duck';
import { feedSelector, previewSelector, feedLoadingSelector, previewLoadingSelector } from './feed.selectors';

const mapStateToProps = (state) => ({
  feed: feedSelector(state),
  feedLoading: feedLoadingSelector(state),
  preview: previewSelector(state),
  previewLoading: previewLoadingSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchFeed, fetchPreview }, dispatch)
});

const withState = connect(mapStateToProps, mapDispatchToProps);

class FeedContainer extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  }

  componentDidMount() {
    this.props.actions.fetchFeed();
  }

  render() {
    return (
      <Feed { ...omit(this.props, 'actions') } />
    );
  }
}

export default withState(FeedContainer);
