import React from 'react';
import classNames from 'classnames';

import styles from './feed-list-item.css';

const FeedListItem = () => {
  const classList = classNames(styles.root);

  return (
    <div className={ classList }>
      FeedListItem
    </div>
  );
};

export default FeedListItem;
