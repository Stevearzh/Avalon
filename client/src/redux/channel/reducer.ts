import { handleActions, Action } from 'redux-actions';
import {
  Payload, State,
  REQUEST_LIST, RECEIVE_LIST, INVALID_LIST, SELECT_CHANNEL  
} from './';

const defaultState: State = {
  list: [],  
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
  choosen: ''
};

export const reducer = handleActions(
  {
    [REQUEST_LIST]: (state: State, action: Action<Payload>): State => {
      return { ...state, isFetching: true, didInvalid: false };
    },
    [RECEIVE_LIST]: (state: State, action: Action<Payload>): State => {
      const list = action.payload && action.payload.list || [];
      const lastUpdate = action.payload && action.payload.receivedAt || -1;      
      return { ...state, isFetching: false, didInvalid: false, list, lastUpdate };
    },
    [INVALID_LIST]: (state: State, action: Action<Payload>): State => {
      const error = action.payload && action.payload.reason || '';
      return { ...state, isFetching: false, didInvalid: true, error };
    },
    [SELECT_CHANNEL]: (state: State, action: Action<Payload>): State => {
      const choosen = action.payload && action.payload.selected || '';
      return { ...state, choosen };
    }
  },
  defaultState
);
