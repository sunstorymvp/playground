import React from 'react';
import { Link } from 'react-router';

import styles from './navigation.css';

const Navigation = () => (
  <div className={ styles.root }>
    <ul className={ styles.menu }>
      <li className={ styles.menuItem }><Link to="/" className={ styles.menuLink }>Feed</Link></li>
      <li className={ styles.menuItem }><Link to="/settings" className={ styles.menuLink }>Settings</Link></li>
    </ul>
  </div>
);

export default Navigation;
