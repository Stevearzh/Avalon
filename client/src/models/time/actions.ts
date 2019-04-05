import { createActions } from 'redux-actions';
import { Payload, Time } from './';

export const CHANGE_TIME = 'CHANGE_TIME';

export const actionCreators = createActions<Payload>({
  [CHANGE_TIME]: (time: Time): Payload => ({
    time,
    type: CHANGE_TIME,
  }),
});
