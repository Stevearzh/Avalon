export type List = string[];

export type Selected = string;

export type Error = string;

export interface Payload {
  readonly list?: string[];
  readonly reason?: string;
  readonly receivedAt?: number;
  readonly selected?: string;
}

export interface State {
  readonly list: string[];
  readonly isFetching: boolean;
  readonly didInvalid: boolean;
  readonly lastUpdate: number;
  readonly error?: string;
  readonly choosen: string;
}
