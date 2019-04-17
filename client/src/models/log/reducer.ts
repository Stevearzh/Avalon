import { INVALID_LOG_LIST, Payload, RECEIVE_LOG_LIST, REQUEST_LOG_LIST, State } from './';

const defaultState: State = {
  list: [],
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
};

export const reducer = (state: State = defaultState, action: Payload): State => {
  switch (action.type) {
    case REQUEST_LOG_LIST:
      return { ...state, isFetching: true, didInvalid: false };
    case RECEIVE_LOG_LIST:
      const list = action.list || [];
      const lastUpdate = action.receivedAt || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    case INVALID_LOG_LIST:
      const error = action.reason || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    default:
      return state;
  }
};
