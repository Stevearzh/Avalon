import { Action, handleActions } from 'redux-actions';
import {
  CHANGE_CURRENT_TIME,
  INVALID_AVAILABLE_TIME,
  Payload,
  RECEIVE_AVAILABLE_TIME,
  REQUEST_AVAILABLE_TIME,
  State,
} from './';

const defaultState: State = {
  list: [],
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
  choosen: new Date(),
};

export const reducer = handleActions<State, Payload>(
  {
    [REQUEST_AVAILABLE_TIME]: (state: State, action: Action<Payload>): State => {
      return { ...state, isFetching: true, didInvalid: false };
    },
    [RECEIVE_AVAILABLE_TIME]: (state: State, action: Action<Payload>): State => {
      const list = (action.payload && action.payload.list) || [];
      const lastUpdate = (action.payload && action.payload.receivedAt) || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    },
    [INVALID_AVAILABLE_TIME]: (state: State, action: Action<Payload>): State => {
      const error = (action.payload && action.payload.reason) || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    },
    [CHANGE_CURRENT_TIME]: (state: State, action: Action<Payload>): State => {
      const choosen = (action.payload && action.payload.selected) || new Date();
      return { ...state, choosen };
    },
  },
  defaultState,
);
