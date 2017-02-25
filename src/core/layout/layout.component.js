import React, { PropTypes } from 'react';

import styles from './layout.css';
import Navigation from 'core/navigation';

const Layout = (props) => (
  <div className={ styles.root }>
    <Navigation />
    { props.children }
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
