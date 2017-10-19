import React from 'react';
import classNames from 'classnames';

import styles from './feed-list.css';
import FeedListItem from '../feed-list-item';

const renderFeedListItems = () => (
  [ 1, 2, 3 ].map((feedListItem) => (
    <FeedListItem key={ feedListItem } />
  ))
);

const FeedList = () => {
  const classList = classNames(styles.root);

  return (
    <div className={ classList }>
      { renderFeedListItems() }
    </div>
  );
};

export default FeedList;
