import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';

export interface OnlineUsersItemStoreProps {
  actualUser: User
}
export interface OnlineUsersItemDispatchProps {
  createPrivateRoom: (user:User, actualUser: User) => SocketIOActionTypes
}
export interface OnlineUsersStandardProps {
  user: User
}
// OnlineUsersState

export type OnlineUsersItemProps = 
  OnlineUsersItemStoreProps & 
  OnlineUsersItemDispatchProps & 
  OnlineUsersStandardProps;