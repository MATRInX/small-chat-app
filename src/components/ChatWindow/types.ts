import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';
export interface ChatWindowStoreProps {
  isUserLoggedInRoom: boolean,
  actualUser: User  
}
export interface ChatWindowDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes
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