import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const configureBrowserHistory = (store) => syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

export default configureBrowserHistory;
