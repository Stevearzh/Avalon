import { Payload as ChannelPayload } from './channel/types';
import { Payload as TimePayload } from './time/types';

export type RootAction = ChannelPayload | TimePayload;
