import { routerReducer as router, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as channel } from './channel/reducer';
import { State as ChannelState } from './channel/types';
import { reducer as time } from './time/reducer';
import { State as TimeState } from './time/types';

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
