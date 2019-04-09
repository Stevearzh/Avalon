import { AnyAction } from 'redux';

export type List = string[];

export type Time = Date;

export type Error = string;

export interface Payload extends AnyAction {
  readonly list?: List;
  readonly reason?: Error;
  readonly receivedAt?: number;
  readonly selected?: Time;
}

export interface State {
  readonly list: List;
  readonly isFetching: boolean;
  readonly didInvalid: boolean;
  readonly lastUpdate: number;
  readonly error?: Error;
  readonly choosen: Time;
}
