import { AnyAction } from 'redux';

export interface Log {
  time: string;
  nick: string;
  message: string;
}

export type List = Log[];

export type Error = string;

export interface Payload extends AnyAction {
  readonly list?: List;
  readonly reason?: Error;
  readonly receivedAt?: number;
}

export interface State {
  readonly list: List;
  readonly isFetching: boolean;
  readonly didInvalid: boolean;
  readonly lastUpdate: number;
  readonly error?: Error;
}
