import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import styles from './feed-list-item.css';

const FeedListItem = (props) => {
  const classList = classNames(styles.root, {
    [styles['root--active']]: props.active
  });

  return (
    <div className={ classList } onClick={ props.active ? null : props.onSelect }>
      <div>
        <span className={ styles.avatar } style={ { backgroundImage: `url('${ props.userAvatarURL }')` } } />
      </div>

      <div>
        <h5 className={ styles.name }>{ props.userName } { moment(props.starredAt).fromNow() }</h5>
        <h4 className={ styles.subject }>{ props.repositoryOwner }/{ props.repositoryName }</h4>
        {
          props.repositoryDescription && <p className={ styles.description }>{ props.repositoryDescription }</p>
        }
      </div>
    </div>
  );
};

FeedListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatarURL: PropTypes.string.isRequired,
  starredAt: PropTypes.instanceOf(Date).isRequired,
  repositoryName: PropTypes.string.isRequired,
  repositoryOwner: PropTypes.string.isRequired,
  repositoryDescription: PropTypes.string
};

FeedListItem.defaultProps = {
  repositoryDescription: null
};

export default FeedListItem;
