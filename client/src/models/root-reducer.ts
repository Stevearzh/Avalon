import { routerReducer as router, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as channel, State as ChannelState } from './channel';
import { reducer as time, State as TimeState } from './time';

export interface RootState {
  router: RouterState;
  channel: ChannelState;
  time: TimeState;
}

export const rootReducer = combineReducers<RootState>({
  router,
  channel,
  time,
});
