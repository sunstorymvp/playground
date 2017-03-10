import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omitBy, isNull } from 'lodash';

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
    return new Map(new FormData(form));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = SettingsContainer.getFormData(form);
    const settings = {
      github: omitBy({
        login: formData.get('githubLogin') || null,
        pollInterval: parseInt(formData.get('githubPollInterval'), 10) || null
      }, isNull)
    };

    form.reset();

    this.props.actions.updateSettings(settings);
  }

  render() {
    return (
      <Settings onSubmit={ this.handleSubmit } settings={ this.props.settings } />
    );
  }
}

export default withState(SettingsContainer);
