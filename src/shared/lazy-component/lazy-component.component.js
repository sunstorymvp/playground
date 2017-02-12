import { Component, PropTypes, createElement } from 'react';

class LazyComponent extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired
  }

  static handleModuleError(error) {
    throw new Error(`Module loading failed: ${ error }`);
  }

  state = { component: null }

  componentDidMount() {
    this.initModule();
  }

  async initModule() {
    const { default: component } = await this.loadModule();

    this.setState({ component });
  }

  loadModule() {
    return import(`../../${ this.props.path }/index.lazy.js`).catch(LazyComponent.handleModuleError);
  }

  render() {
    const { component } = this.state;

    return component && createElement(component);
  }
}

export default LazyComponent;
