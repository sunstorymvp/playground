import React from 'react';
import PropTypes from 'prop-types';

import styles from './settings.css';
import Layout from 'core/layout';

const Settings = ({ onSubmit, settings }) => (
  <Layout>
    <div className={ styles.root }>
      <h1>Settings</h1>

      <form onSubmit={ onSubmit }>
        <p>
          <label>GitHub login: </label>
          <input type="text" name="githubLogin" placeholder={ settings.github.login } />
        </p>
        <p>
          <label>GitHub poll interval: </label>
          <input type="number" name="githubPollInterval" placeholder={ settings.github.pollInterval } />
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
