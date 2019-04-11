import { Dispatch } from '@src/models';
import { Error, List, Payload } from '.';

export const REQUEST_AVAILABLE_DATE = 'REQUEST_AVAILABLE_DATE';
export const RECEIVE_AVAILABLE_DATE = 'RECEIVE_AVAILABLE_DATE';
export const INVALID_AVAILABLE_DATE = 'INVALID_AVAILABLE_DATE';
export const CHANGE_CURRENT_DATE = 'CHANGE_CURRENT_DATE';

const requestAvailableDate = (): Payload => ({
  type: REQUEST_AVAILABLE_DATE,
});

const receiveAvailableDate = (list: List): Payload => ({
  list,
  receivedAt: Date.now(),
  type: RECEIVE_AVAILABLE_DATE,
});

const invalidAvailableDate = (error: Error): Payload => ({
  reason: error,
  type: INVALID_AVAILABLE_DATE,
});

const changeCurrentDate = (time: Date): Payload => ({
  selected: time,
  type: CHANGE_CURRENT_DATE,
});

export const actionCreators = {
  changeCurrentDate,
  fetchAvailableDate: () => (dispatch: Dispatch) => {
    dispatch(requestAvailableDate());
    return fetch('/api/times')
      .then((res: Response) => res.json())
      .then((json: { data: { list: [] } }) => {
        dispatch(receiveAvailableDate(json.data.list));
      })
      .catch(error => invalidAvailableDate('unknown error'));
  },
};
