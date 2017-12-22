import * as moment from 'moment';
import { handleActions, Action } from 'redux-actions';
import {
  Payload, State,
  CHANGE_TIME
} from './';

const defaultState: State = {
  choosen: moment()
};

export const reducer = handleActions(
  {
    [CHANGE_TIME]: (state: State, action: Action<Payload>): State => {
      const choosen = action.payload && action.payload.time || moment();
      return { ...state, choosen };
    }
  },
  defaultState
);
