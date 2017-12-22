import { createActions } from 'redux-actions';
import { Time, Payload } from './';

export const CHANGE_TIME = 'CHANGE_TIME';

export const actionCreators = createActions({
  [CHANGE_TIME]: (time: Time): Payload => ({ time })
});
