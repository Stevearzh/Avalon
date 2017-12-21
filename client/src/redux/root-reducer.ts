import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { State as ChannelState, reducer as channel } from './channel';

export interface RootState {
  router: RouterState;
  channel: ChannelState;
}

export const rootReducer = combineReducers<RootState>({
  router,
  channel
});
