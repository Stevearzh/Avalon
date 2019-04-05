import { createActions } from 'redux-actions';

import { Dispatch } from '@src/models';
import { history } from '@src/store';
import { cleanChannel } from '@src/utils';
import { Error, List, Payload, Selected } from './';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const INVALID_LIST = 'INVALID_LIST';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';

const {
  requestList, receiveList,
  selectChannel, invalidList,
} = createActions<Payload>({
  [REQUEST_LIST]: () => ({
    type: REQUEST_LIST,
  }),
  [RECEIVE_LIST]: (list: List): Payload => ({
    list,
    receivedAt: Date.now(),
    type: RECEIVE_LIST,
  }),
  [SELECT_CHANNEL]: (selected: Selected): Payload => {    
    if (history.location.pathname !== `/home/${cleanChannel(selected)}`) {      
      history.push(`/home/${cleanChannel(selected)}`);
    }
    return ({
      selected,
      type: SELECT_CHANNEL,
    });
  },
  [INVALID_LIST]: (error: Error): Payload => ({
    reason: error,
    type: INVALID_LIST,
  }),
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
  },
  selectChannel,
};