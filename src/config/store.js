import { createStore } from 'redux';

import rootReducer from './store.root-reducer';
import initialState from './store.initial-state';
import enhancer from './store.enhancer';

const configureStore = () => {
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};

export default configureStore;
