import { routerReducer as router, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as channel } from './channel/reducer';
import { State as ChannelState } from './channel/types';
import { reducer as date } from './date/reducer';
import { State as DateState } from './date/types';
import { reducer as log } from './log/reducer';
import { State as LogState } from './log/types';

export interface RootState {
  router: RouterState;
  channel: ChannelState;
  date: DateState;
  log: LogState;
}

export const rootReducer = combineReducers<RootState>({
  router,
  channel,
  date,
  log,
});
