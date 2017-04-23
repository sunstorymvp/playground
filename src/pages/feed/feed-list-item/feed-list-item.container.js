import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FeedListItem from './feed-list-item.component';
import { fetchPreview } from '../feed.duck';
import { previewItemIdSelector } from '../feed.selectors';

const mapStateToProps = (state) => ({
  previewItemId: previewItemIdSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchPreview }, dispatch)
});

const withState = connect(mapStateToProps, mapDispatchToProps);

class FeedListItemContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    previewItemId: PropTypes.string
  }

  static defaultProps = {
    previewItemId: null
  }

  handleSelect = () => {
    this.props.actions.fetchPreview(this.props.id);
  }

  isActive() {
    return this.props.id === this.props.previewItemId;
  }

  render() {
    return (
      <FeedListItem onSelect={ this.handleSelect } active={ this.isActive() } { ...this.props } />
    );
  }
}

export default withState(FeedListItemContainer);
