import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './feed-list.css';
import FeedListItem from '../feed-list-item';

const renderFeedListItems = (feed) => (
  feed.map((feedItem) => (
    <FeedListItem key={ feedItem.id } { ...feedItem } />
  ))
);

const FeedList = ({ feed, loading }) => {
  const isNoData = feed.length === 0;
  const isHidden = loading || isNoData;

  const classList = classNames(styles.root, {
    [styles['root--loading']]: loading,
    [styles['root--empty']]: !loading && isNoData
  });

  return (
    <div className={ classList }>
      { isHidden || renderFeedListItems(feed) }
    </div>
  );
};

FeedList.propTypes = {
  feed: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FeedList;
