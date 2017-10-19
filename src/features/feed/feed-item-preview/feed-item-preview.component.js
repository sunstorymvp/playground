import React from 'react';
import classNames from 'classnames';

import styles from './feed-item-preview.css';

const FeedItemPreview = () => {
  const classList = classNames(styles.root);

  return (
    <div className={ classList }>
      FeedItemPreview
    </div>
  );
};

export default FeedItemPreview;
