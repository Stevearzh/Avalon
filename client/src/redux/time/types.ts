import { Moment } from 'moment';

export type Time = Moment;

export interface Payload {
  readonly time: Time;
}

export interface State {
  readonly choosen: Time;
}
