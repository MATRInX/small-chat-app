import { Room } from '../../redux/store/types';
import { PrivRequestModalInfo } from  '../PrivRequestModal/types';

export interface ChatAppStateProps {
  rooms: Room[]
}

// ChatAppDispatchProps
// ChatAppStandardProps
export interface ChatAppState {
  invitations: PrivRequestModalInfo[]
}

export type ChatAppProps = ChatAppStateProps;