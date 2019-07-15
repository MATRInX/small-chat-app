import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';

export interface OnlineUsersItemStoreProps {
  actualUser: User
}
export interface OnlineUsersItemDispatchProps {
  createPrivateRoom: (roomName: string) => SocketIOActionTypes,
  addUserToPrivateRoom: (roomName: string, newUser: User) => SocketIOActionTypes
}
export interface OnlineUsersStandardProps {
  user: User
}
// OnlineUsersState

export type OnlineUsersItemProps = 
  OnlineUsersItemStoreProps & 
  OnlineUsersItemDispatchProps & 
  OnlineUsersStandardProps;