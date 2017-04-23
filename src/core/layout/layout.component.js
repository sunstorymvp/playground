import React from 'react';
import PropTypes from 'prop-types';

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
