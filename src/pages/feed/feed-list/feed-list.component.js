import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './feed-list.css';
import FeedListItem from '../feed-list-item';

const FeedList = ({ feed, loading }) => {
  const classList = classNames(styles.root, {
    [styles['root--loading']]: loading,
    [styles['root--empty']]: feed.length === 0
  });

  return (
    <div className={ classList }>
      { loading || feed.map(({ id, ...itemData }) => (
        <FeedListItem key={ id } { ...itemData } />
      )) }
    </div>
  );
};

FeedList.propTypes = {
  feed: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FeedList;
