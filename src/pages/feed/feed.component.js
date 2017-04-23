import React from 'react';
import PropTypes from 'prop-types';

import Layout from 'core/layout';
import FeedList from './feed-list';
import FeedItemPreview from './feed-item-preview';

const Feed = (props) => (
  <Layout>
    <FeedList loading={ props.feedLoading } feed={ props.feed } />
    <FeedItemPreview loading={ props.previewLoading } preview={ props.preview } />
  </Layout>
);

Feed.propTypes = {
  feed: PropTypes.array,
  feedLoading: PropTypes.bool.isRequired,
  preview: PropTypes.object,
  previewLoading: PropTypes.bool.isRequired
};

Feed.defaultProps = {
  feed: [],
  preview: {}
};

export default Feed;
