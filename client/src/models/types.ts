import { Dispatch as ReduxDispatch } from 'redux';

import { RootAction } from './';

export type Dispatch = ReduxDispatch<RootAction>;
