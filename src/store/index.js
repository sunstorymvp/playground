import { createStore } from 'redux';

import rootReducer from './reducers/';
import initialState from './initial_state';
import enhancer from './enhancer';

const store = createStore(rootReducer, initialState, enhancer);

export default store;
