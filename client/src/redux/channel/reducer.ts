import { createAction, handleAction, Action } from 'redux-actions';
import { Dispatch } from '@src/redux';
import { List, Selected, Error } from './';

interface State {
  readonly list: string[];
  readonly selected: string;
  readonly isFetching: boolean;
  readonly didInvalid: boolean;
  readonly lastUpdate: number;
  readonly error?: string;  
}

const defaultState: State = {
  list: [],
  selected: '',
  isFetching: false,
  didInvalid: false,
  lastUpdate: -1
};

const requestList = createAction('REQUEST_LIST');

const receiveList = createAction(
  'RECEIVE_LIST',
  (list: string[]): List => ({ list, receivedAt: Date.now() })
);

const invalidList = createAction(
  'INVALID_LIST',
  (reason: string): Error => ({ reason })
);

const selectChannel = createAction('SELECT_CHANNEL', (selected: string): Selected => ({ selected }));

export const fetchList = createAction(
  'FETCH_LIST',
  () => (dispatch: Dispatch) => {
    dispatch(requestList());
    return fetch('/api/channels')
      .then((res: Response) => res.json())
      .then(json => {
        dispatch(receiveList(json.data.list));
        dispatch(selectChannel(json.data.list[0]));
      })      
      .catch(error => invalidList('unknown error'));
  }
);

export const requestListHandler = handleAction(
  typeof requestList,
  (state: State, action: Action<void>): State => ({
    ...state,
    isFetching: true,
    didInvalid: false
  }),
  defaultState
);

export const reciveListHander = handleAction(
  typeof receiveList,
  (state: State, action: Action<List>): State => {
      const list = action.payload && action.payload.list || [];
      const lastUpdate = action.payload && action.payload.receivedAt || -1;
      return { ...state, isFetching: false, didInvalid: false, list, lastUpdate };
  },
  defaultState
);

export const invalidListHandler = handleAction(
  typeof invalidList,
  (state: State, action: Action<Error>): State => {
    const error = action.payload && action.payload.reason || '';
    return { ...state, isFetching: false, didInvalid: true, error };
  },
  defaultState
);
