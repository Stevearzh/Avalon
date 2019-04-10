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

export const reducer = (state: State = defaultState, action: Payload): State => {
  switch (action.type) {
    case REQUEST_AVAILABLE_TIME:
      return { ...state, isFetching: true, didInvalid: false };
    case RECEIVE_AVAILABLE_TIME:
      const list = action.list || [];
      const lastUpdate = action.receivedAt || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    case INVALID_AVAILABLE_TIME:
      const error = action.reason || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    case CHANGE_CURRENT_TIME:
      const choosen = action.selected || new Date();
      return { ...state, choosen };
    default:
      return state;
  }
};
