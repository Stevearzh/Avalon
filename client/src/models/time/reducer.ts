import { Action, handleActions } from 'redux-actions';
import {
  CHANGE_TIME, Payload,
  State,
} from './';

const defaultState: State = {
  choosen: new Date,
};

export const reducer = handleActions<State, Payload>(
  {
    [CHANGE_TIME]: (state: State, action: Action<Payload>): State => {
      const choosen = action.payload && action.payload.time || new Date;
      return { ...state, choosen };
    },
  },
  defaultState,
);
