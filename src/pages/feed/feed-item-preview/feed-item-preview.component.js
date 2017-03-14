import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { isEmpty, omitBy, isNil } from 'lodash';

import styles from './feed-item-preview.css';

const FeedItemPreview = ({ loading, preview }) => {
  const isNoData = isEmpty(omitBy(preview, isNil));
  const isHidden = loading || isNoData;

  const classList = classNames(styles.root, {
    [styles['root--loading']]: loading,
    [styles['root--empty']]: !loading && isNoData
  });

  return (
    <div className={ classList }>
      { isHidden || <ReactMarkdown source={ preview.readme } /> }
    </div>
  );
};

FeedItemPreview.propTypes = {
  preview: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FeedItemPreview;
