import React from 'react';

import Layout from 'core/layout';
import FeedList from './feed-list';
import FeedItemPreview from './feed-item-preview';

const Feed = () => (
  <Layout>
    <FeedList />
    <FeedItemPreview />
  </Layout>
);

export default Feed;
