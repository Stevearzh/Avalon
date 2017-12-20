import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

export interface RootState {
  router: RouterState;
}

export const rootReducer = combineReducers<RootState>({
  router
});
