import React from 'react';

import LazyComponent from 'shared/lazy-component';
import Layout from 'core/layout';
import FeedList from './feed-list';

const Feed = () => (
  <Layout>
    <FeedList />
    <LazyComponent path="pages/feed/feed-item-preview" />
  </Layout>
);

export default Feed;
