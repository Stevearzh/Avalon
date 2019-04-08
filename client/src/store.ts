import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { RootAction, rootReducer, RootState } from '@src/models';

export const history = createBrowserHistory();

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [reduxThunk, routerMiddleware(history)];

  // configure
  let enhancer;
  try {
    const createLogger = require('redux-logger').createLogger;
    const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;

    middlewares.push(createLogger());
    enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  } catch (error) {
    enhancer = applyMiddleware(...middlewares);
  }

  // create store
  return createStore<RootState, RootAction, {}, {}>(rootReducer /* preloadedState, */, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
