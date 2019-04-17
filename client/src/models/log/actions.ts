import { Dispatch } from '@src/models';
import { Error, List, Log, Payload } from './';

export const REQUEST_LOG_LIST = 'REQUEST_LOG_LIST';
export const RECEIVE_LOG_LIST = 'RECEIVE_LOG_LIST';
export const INVALID_LOG_LIST = 'INVALID_LOG_LIST';

const requestList = (): Payload => ({
  type: REQUEST_LOG_LIST,
});

const receiveList = (list: List): Payload => ({
  list,
  receivedAt: Date.now(),
  type: RECEIVE_LOG_LIST,
});

const invalidList = (error: Error): Payload => ({
  reason: error,
  type: INVALID_LOG_LIST,
});

export const actionCreators = {
  fetchList: () => (dispatch: Dispatch) => {
    dispatch(requestList());
    return fetch('/api/channels')
      .then((res: Response) => res.json())
      .then((json: { data: { list: Log[] } }) => {
        dispatch(receiveList(json.data.list));
      })
      .catch(error => invalidList('unknown error'));
  },
};
