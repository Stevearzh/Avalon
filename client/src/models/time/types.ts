import { AnyAction } from 'redux';

export type Time = Date;

export interface Payload extends AnyAction {
  readonly time: Time;
}

export interface State {
  readonly choosen: Time;
}
