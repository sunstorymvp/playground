import { createActions, handleActions } from 'redux-actions';

const actions = createActions('UPDATE_FEED');
const { updateFeed } = actions;
const initialState = {};

const reducer = handleActions({
  [updateFeed]: (state, action) => action
}, initialState);

export {
  reducer,
  actions
};
