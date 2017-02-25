import React, { PropTypes } from 'react';
import moment from 'moment';

import styles from './feed-list-item.css';

const FeedListItem = (props) => (
  <a className={ styles.root }
     href={ props.repositoryURL }
     target="_blank"
     rel="noopener noreferrer">

    <div>
      <span className={ styles.avatar } style={ { backgroundImage: `url('${ props.userAvatarURL }')` } } />
    </div>

    <div>
      <h5 className={ styles.name }>{ props.userName } { props.starredAt && moment(props.starredAt).fromNow() }</h5>
      <h4 className={ styles.subject }>{ props.repositoryName }</h4>
      {
        props.repositoryDescription && <p className={ styles.description }>{ props.repositoryDescription }</p>
      }
    </div>
  </a>
);

FeedListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatarURL: PropTypes.string.isRequired,
  starredAt: PropTypes.instanceOf(Date).isRequired,
  repositoryURL: PropTypes.string.isRequired,
  repositoryName: PropTypes.string.isRequired,
  repositoryDescription: PropTypes.string
};

FeedListItem.defaultProps = {
  repositoryDescription: ''
};

export default FeedListItem;
