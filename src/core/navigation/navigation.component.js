import React from 'react';
import classNames from 'classnames';

import styles from './navigation.css';

const FeedLayout = () => (
  <div className={ classNames('pure-u', styles.root) }>
    <a href="#" className={ styles.menuButton }>Menu</a>

    <ul className={ styles.menu }>
      <li className={ styles.menuItem }><a href="#" className={ styles.menuLink }>Inbox <span className={ styles.count }>(2)</span></a></li>
      <li className={ styles.menuItem }><a href="#" className={ styles.menuLink }>Important</a></li>
      <li className={ styles.menuItem }><a href="#" className={ styles.menuLink }>Sent</a></li>
      <li className={ styles.menuItem }><a href="#" className={ styles.menuLink }>Drafts</a></li>
      <li className={ styles.menuItem }><a href="#" className={ styles.menuLink }>Trash</a></li>
    </ul>
  </div>
);

export default FeedLayout;
