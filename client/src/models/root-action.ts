import { Payload as ChannelPayload } from './channel';
import { Payload as TimePayload } from './time';

export type RootAction = ChannelPayload | TimePayload;
