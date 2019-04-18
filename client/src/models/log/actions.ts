import * as queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';

import { Dispatch } from '@src/models';
import { Error, List, Log, Payload } from './';

export const REQUEST_LOG_LIST = 'REQUEST_LOG_LIST';
export const RECEIVE_LOG_LIST = 'RECEIVE_LOG_LIST';
export const INVALID_LOG_LIST = 'INVALID_LOG_LIST';

const requestList = (): Payload => ({
  type: REQUEST_LOG_LIST,
});

const receiveList = (list: List, total: number): Payload => ({
  list,
  total,
  receivedAt: Date.now(),
  type: RECEIVE_LOG_LIST,
});

const invalidList = (error: Error): Payload => ({
  reason: error,
  type: INVALID_LOG_LIST,
});

export const actionCreators = {
  fetchList: (channel: string, date: string, limit: number, offset: number) => (dispatch: Dispatch) => {
    const [year, month, day] = date.split('-');
    dispatch(requestList());
    return fetch(
      `/api/irc-logs?${queryString.stringify({
        year,
        month,
        day,
        channel,
        limit,
        offset,
      })}`,
    )
      .then((res: Response) => res.json())
      .then((json: { data: { logs: Log[]; total: number } }) => {
        dispatch(receiveList(json.data.logs, json.data.total));
        scroll.scrollToTop({
          duration: 300,
          delay: 0,
          smooth: 'easeInOutQuart',
        });
      })
      .catch(error => invalidList('unknown error'));
  },
};
