import { createAction } from 'redux-actions';
import { Dispatch } from '@src/redux';
import { List, Selected, Error, Payload } from './';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const INVALID_LIST = 'INVALID_LIST';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';

const request = createAction(
  REQUEST_LIST,
  (): Payload => ({})
);

const receive = createAction(
  RECEIVE_LIST,
  (list: List): Payload => ({ list, receivedAt: Date.now() })
);

const select = createAction(
  SELECT_CHANNEL,
  (selected: Selected): Payload => ({ selected })
);

const invalid = createAction(
  INVALID_LIST,
  (error: Error): Payload => ({ reason: error })
);

export const actionCreators = {
  fetchList: () => (dispatch: Dispatch) => {
    dispatch(request());        
    return fetch('/api/channels')
      .then((res: Response) => res.json())
      .then(json => {        
        dispatch(receive(json.data.list));
        dispatch(select(json.data.list[0]));        
      })      
      .catch(error => invalid('unknown error'));
  },
  select
};
