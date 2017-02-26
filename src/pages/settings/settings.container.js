import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omitBy, isNull, fromPairs } from 'lodash';

import Settings from './settings.component';
import { actions as settingsActions } from 'core/settings/settings.duck';
import { settingsSelector } from 'selectors/settings';

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(settingsActions, dispatch)
});

const withState = connect(mapStateToProps, mapDispatchToProps);

class SettingsContainer extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  }

  static getFormData(form) {
    return fromPairs([ ...new FormData(form) ]);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = SettingsContainer.getFormData(form);
    const settings = {
      github: omitBy({
        login: formData.githubLogin || null,
        pollInterval: parseInt(formData.githubPollInterval, 10) || null
      }, isNull)
    };

    form.reset();

    // eslint-disable-next-line no-invalid-this
    this.props.actions.updateSettings(settings);
  }

  render() {
    return (
      <Settings onSubmit={ this.handleSubmit } settings={ this.props.settings } />
    );
  }
}

export default withState(SettingsContainer);
