import React, { Component, PropTypes } from 'react';

class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Module: null
    };
  }

  componentDidMount() {
    this.loadModule();
  }

  async loadModule() {
    try {
      const { default: Module } = await import(`components/${ this.props.path }/index.js`);

      this.setState({ Module });
    } catch (error) {
      AsyncComponent.handleError(error);
    }
  }

  render() {
    const { Module } = this.state;

    return Module && <Module />;
  }

  static handleError(error) {
    throw new Error(`Async component loading failed: ${ error }`);
  }
}

AsyncComponent.propTypes = {
  path: PropTypes.string.isRequired
};

export default AsyncComponent;
