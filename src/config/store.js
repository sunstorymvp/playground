import { createStore } from 'redux';

import rootReducer from './store.root-reducer';
import initialState from './store.initial-state';
import enhancer from './store.enhancer';

const configureStore = () => {
  const store = createStore(rootReducer, initialState, enhancer);

  // TODO: fix reducers HMR
  // not working after moving reducers to features
  module.hot && module.hot.accept() && module.hot.accept('./store.root-reducer', () => (
    store.replaceReducer(require('./store.root-reducer').default)
  ));

  return store;
};

export default configureStore;
