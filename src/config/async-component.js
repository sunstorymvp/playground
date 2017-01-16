import { Component, PropTypes, createElement } from 'react';

class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    this.loadModule();
  }

  async loadModule() {
    try {
      const { default: component } = await import(`components/${ this.props.path }/index.js`);

      this.setState({ component });
    } catch (error) {
      AsyncComponent.handleError(error);
    }
  }

  render() {
    const { component } = this.state;

    return component && createElement(component);
  }

  static handleError(error) {
    throw new Error(`Async component loading failed: ${ error }`);
  }
}

AsyncComponent.propTypes = {
  path: PropTypes.string.isRequired
};

export default AsyncComponent;
