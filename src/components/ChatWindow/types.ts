import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';
export interface ChatWindowStoreProps {
  isUserLoggedInRoom: boolean,
  actualUser: User,
  usersInRoom: User[]  
}
export interface ChatWindowDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes,
  deleteUserFromRoom: (roomName: string, socketId: string) => SocketIOActionTypes,
  deleteUser: (socketId: string) => SocketIOActionTypes,
  deleteRoom: (roomName: string, usersInRoom: User[]) => SocketIOActionTypes
}
export interface ChatWindowStandardProps {
  roomName: string
};
export interface ChatWindowState {
  nickname: string
};

export type ChatWindowProps =
  ChatWindowStoreProps &
  ChatWindowDispatchProps &
  ChatWindowStandardProps;