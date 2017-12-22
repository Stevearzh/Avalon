import { createActions } from 'redux-actions';

import { Dispatch } from '@src/redux';
import { List, Selected, Error, Payload } from './';
import { cleanChannel } from '@src/utils';
import { history } from '@src/store';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const INVALID_LIST = 'INVALID_LIST';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';

const {
  requestList, receiveList,
  selectChannel, invalidList
} = createActions({
  [REQUEST_LIST]: () => ({}),
  [RECEIVE_LIST]: (list: List): Payload => ({ list, receivedAt: Date.now() }),
  [SELECT_CHANNEL]: (selected: Selected): Payload => {    
    if (history.location.pathname !== `/home/${cleanChannel(selected)}`) {      
      history.push(`/home/${cleanChannel(selected)}`);
    }
    return ({ selected });
  },
  [INVALID_LIST]: (error: Error): Payload => ({ reason: error })
});

export const actionCreators = {
  fetchList: () => (dispatch: Dispatch) => {
    dispatch(requestList());
    return fetch('/api/channels')
      .then((res: Response) => res.json())
      .then(json => {        
        dispatch(receiveList(json.data.list));        
      })      
      .catch(error => invalidList('unknown error'));
  }, selectChannel
};