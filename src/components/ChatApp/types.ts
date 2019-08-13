import { Room } from '../../redux/store/types';
import { PrivRequestModalInfo } from  '../PrivRequestModal/types';
import { PrivRejectModalInfo } from '../PrivRejectInfoModal/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';

export interface ChatAppStateProps {
  rooms: Room[],
  joinedUsers: User[]
}

export interface ChatAppDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes,
  createPrivateRoom: (roomName: string) => SocketIOActionTypes,
  deleteUserFromRoom: (roomName: string, socketId: string) => SocketIOActionTypes,
  deleteRoom: (roomName: string) => SocketIOActionTypes
}
// ChatAppStandardProps
export interface ChatAppState {
  invitations: PrivRequestModalInfo[],
  rejections: PrivRejectModalInfo[]
}

export type ChatAppProps = ChatAppStateProps & ChatAppDispatchProps;