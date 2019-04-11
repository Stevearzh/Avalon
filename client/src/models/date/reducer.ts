import {
  CHANGE_CURRENT_DATE,
  INVALID_AVAILABLE_DATE,
  Payload,
  RECEIVE_AVAILABLE_DATE,
  REQUEST_AVAILABLE_DATE,
  State,
} from '.';

const defaultState: State = {
  list: [],
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1,
  choosen: new Date(),
};

export const reducer = (state: State = defaultState, action: Payload): State => {
  switch (action.type) {
    case REQUEST_AVAILABLE_DATE:
      return { ...state, isFetching: true, didInvalid: false };
    case RECEIVE_AVAILABLE_DATE:
      const list = action.list || [];
      const lastUpdate = action.receivedAt || -1;
      return { ...state, list, lastUpdate, isFetching: false, didInvalid: false };
    case INVALID_AVAILABLE_DATE:
      const error = action.reason || '';
      return { ...state, error, isFetching: false, didInvalid: true };
    case CHANGE_CURRENT_DATE:
      const choosen = action.selected || new Date();
      return { ...state, choosen };
    default:
      return state;
  }
};
