import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';
export interface ChatWindowStoreProps {
  isUserLoggedInRoom: boolean
}
export interface ChatWindowDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes
}
export interface ChatWindowStandardProps {
  roomName: string
};
export interface ChatWindowState {
  nickname: string,
  isLoggedIn: boolean
};

export type ChatWindowProps =
  ChatWindowStoreProps &
  ChatWindowDispatchProps &
  ChatWindowStandardProps;