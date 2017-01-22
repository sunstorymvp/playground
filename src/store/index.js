import { createStore } from 'redux';

import rootReducer from './reducers';
import initialState from './initial-state';
import enhancer from './enhancer';

const configureStore = () => {
  const store = createStore(rootReducer, initialState, enhancer);

  module.hot && module.hot.accept() && module.hot.accept('./reducers', () => (
    store.replaceReducer(require('./reducers').default)
  ));

  return store;
};

export default configureStore;
