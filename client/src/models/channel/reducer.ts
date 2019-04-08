import { Action, handleActions } from 'redux-actions';
import { INVALID_LIST, Payload, RECEIVE_LIST, REQUEST_LIST, SELECT_CHANNEL, State } from './';

const defaultState: State = {
  list: [],
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
  choosen: '',
};

export const reducer = handleActions<State, Payload>(
  {
    [REQUEST_LIST]: (state: State, action: Action<Payload>): State => {
      return { ...state, isFetching: true, didInvalid: false };
    },
    [RECEIVE_LIST]: (state: State, action: Action<Payload>): State => {
      const list = (action.payload && action.payload.list) || [];
      const lastUpdate = (action.payload && action.payload.receivedAt) || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    },
    [INVALID_LIST]: (state: State, action: Action<Payload>): State => {
      const error = (action.payload && action.payload.reason) || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    },
    [SELECT_CHANNEL]: (state: State, action: Action<Payload>): State => {
      const choosen = (action.payload && action.payload.selected) || '';
      return { ...state, choosen };
    },
  },
  defaultState,
);
