import { routerReducer as router, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as channel } from './channel/reducer';
import { State as ChannelState } from './channel/types';
import { reducer as date } from './date/reducer';
import { State as TimeState } from './date/types';

export interface RootState {
  router: RouterState;
  channel: ChannelState;
  date: TimeState;
}

export const rootReducer = combineReducers<RootState>({
  router,
  channel,
  date,
});
