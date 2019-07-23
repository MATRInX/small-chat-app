import { Room } from '../../redux/store/types';

export interface ChatAppStateProps {
  rooms: Room[]
}

// ChatAppDispatchProps
// ChatAppStandardProps
export interface ChatAppState {
  isModalOpen: boolean
}

export type ChatAppProps = ChatAppStateProps;