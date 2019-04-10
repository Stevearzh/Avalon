import { INVALID_LIST, Payload, RECEIVE_LIST, REQUEST_LIST, SELECT_CHANNEL, State } from './';

const defaultState: State = {
  list: [],
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
  choosen: '',
};

export const reducer = (state: State = defaultState, action: Payload): State => {
  switch (action.type) {
    case REQUEST_LIST:
      return { ...state, isFetching: true, didInvalid: false };
    case RECEIVE_LIST:
      const list = action.list || [];
      const lastUpdate = action.receivedAt || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    case INVALID_LIST:
      const error = action.reason || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    case SELECT_CHANNEL:
      const choosen = action.selected || '';
      return { ...state, choosen };
    default:
      return state;
  }
};
