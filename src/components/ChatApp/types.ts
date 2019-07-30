import { Room } from '../../redux/store/types';
import { PrivRequestModalInfo } from  '../PrivRequestModal/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';

export interface ChatAppStateProps {
  rooms: Room[]
}

export interface ChatAppDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes,
  createPrivateRoom: (roomName: string) => SocketIOActionTypes
}
// ChatAppStandardProps
export interface ChatAppState {
  invitations: PrivRequestModalInfo[]
}

export type ChatAppProps = ChatAppStateProps & ChatAppDispatchProps;