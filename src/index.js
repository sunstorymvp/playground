import { createElement } from 'react';
import { render } from 'react-dom';

import 'index.css';
import configureStore from 'config/store';
import configureBrowserHistory from 'config/history';
import apolloClient from 'config/apollo';
import App from 'core/app';

const store = configureStore();
const browserHistory = configureBrowserHistory(store);
const root = document.querySelector('#root');
const renderApp = (component, props) => render(createElement(component, props), root);

renderApp(App, { store, browserHistory, apolloClient });

module.hot && module.hot.accept('core/app', () => (
  renderApp(require('core/app').default, { store, browserHistory, apolloClient })
));
