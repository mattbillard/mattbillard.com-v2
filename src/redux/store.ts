import { applyMiddleware, combineReducers, createStore, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { textReducer } from './text';

const rootReducer = combineReducers({
  textReducer
});

export type IStoreState = ReturnType<typeof rootReducer>;

export const configureStore = () => createStore(
  rootReducer,
  // initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);
