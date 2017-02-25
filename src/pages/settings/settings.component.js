import React, { PropTypes } from 'react';

import styles from './settings.css';
import Layout from 'core/layout';

const Settings = ({ onSubmit, settings }) => (
  <Layout>
    <div className={ styles.root }>
      <h1>Settings</h1>

      <form onSubmit={ onSubmit }>
        <p>
          <label>GitHub login: </label>
          <input type="text" name="github_login" placeholder={ settings.github.login } />
        </p>
        <p>
          <label>GitHub poll interval: </label>
          <input type="number" name="github_poll_interval" placeholder={ settings.github.pollInterval } />
        </p>
        <button>Save</button>
      </form>
    </div>
  </Layout>
);

Settings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default Settings;
