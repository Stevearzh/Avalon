import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import { rootReducer, RootState } from '@src/redux';

export const history = createHistory();

function configureStore (initialState?: RootState) {
  // configure middlewares
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history)
  ];

  // configure
  let enhancer;
  try {
    const createLogger = require('redux-logger').createLogger;
    const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;

    middlewares.push(createLogger());
    enhancer = composeWithDevTools(
      applyMiddleware(...middlewares)
    );
  } catch (error) {
    enhancer = applyMiddleware(...middlewares);
  }

  // create store
  return createStore<RootState>(
    rootReducer, /* preloadedState, */
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
