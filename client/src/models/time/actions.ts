import { createActions } from 'redux-actions';

import { Dispatch } from '@src/models';
import { Error, List, Payload, Time } from './';

export const REQUEST_AVAILABLE_TIME = 'REQUEST_AVAILABLE_TIME';
export const RECEIVE_AVAILABLE_TIME = 'RECEIVE_AVAILABLE_TIME';
export const INVALID_AVAILABLE_TIME = 'INVALID_AVAILABLE_TIME';
export const CHANGE_CURRENT_TIME = 'CHANGE_CURRENT_TIME';

const { invalidAvailableTime, receiveAvailableTime, requestAvailableTime, changeCurrentTime } = createActions<Payload>({
  [REQUEST_AVAILABLE_TIME]: () => ({
    type: REQUEST_AVAILABLE_TIME,
  }),
  [RECEIVE_AVAILABLE_TIME]: (list: List): Payload => ({
    list,
    receivedAt: Date.now(),
    type: RECEIVE_AVAILABLE_TIME,
  }),
  [CHANGE_CURRENT_TIME]: (time: Time): Payload => ({
    selected: time,
    type: CHANGE_CURRENT_TIME,
  }),
  [INVALID_AVAILABLE_TIME]: (error: Error): Payload => ({
    reason: error,
    type: INVALID_AVAILABLE_TIME,
  }),
});

export const actionCreators = {
  changeCurrentTime,
  fetchAvailableTime: () => (dispatch: Dispatch) => {
    dispatch(requestAvailableTime());
    return fetch('/api/times')
      .then((res: Response) => res.json())
      .then((json: { data: { list: {} } }) => {
        dispatch(receiveAvailableTime(json.data.list));
      })
      .catch(error => invalidAvailableTime('unknown error'));
  },
};
