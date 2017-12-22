import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { State as ChannelState, reducer as channel } from './channel';
import { State as TimeState, reducer as time } from './time';

export interface RootState {
  router: RouterState;
  channel: ChannelState;
  time: TimeState;
}

export const rootReducer = combineReducers<RootState>({
  router,
  channel,
  time
});
