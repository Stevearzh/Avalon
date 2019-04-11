import { Payload as ChannelPayload } from './channel/types';
import { Payload as DatePayload } from './date/types';

export type RootAction = ChannelPayload | DatePayload;
