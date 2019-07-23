import { Room } from '../../redux/store/types';

export interface ChatAppStateProps {
  rooms: Room[]
}

// ChatAppDispatchProps
// ChatAppStandardProps
export interface ChatAppState {
  isModalOpen: boolean,
  invitingUser: string,
  roomName: string
}

export type ChatAppProps = ChatAppStateProps;