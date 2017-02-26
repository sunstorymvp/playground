import React from 'react';

import Layout from 'core/layout';
import FeedList from './feed-list';
import FeedListPreview from './feed-item-preview';

const Feed = () => (
  <Layout>
    <FeedList />
    <FeedListPreview />
  </Layout>
);

export default Feed;
