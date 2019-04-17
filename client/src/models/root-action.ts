import { Payload as ChannelPayload } from './channel/types';
import { Payload as DatePayload } from './date/types';
import { Payload as LogPayload } from './log/types';

export type RootAction = ChannelPayload | DatePayload | LogPayload;
