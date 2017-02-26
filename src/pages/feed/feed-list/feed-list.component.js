import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './feed-list.css';
import FeedListItem from '../feed-list-item';

const FeedList = ({ feed, loading }) => (
  <div className={ classNames(styles.root, { [styles.rootLoading]: loading }) }>
    { loading || feed.map(({ cursor, ...itemData }) => (
      <FeedListItem key={ cursor } { ...itemData } />
    )) }
  </div>
);

FeedList.propTypes = {
  feed: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FeedList;
