import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';
// ChatWindowStateProps
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

export type ChatWindowProps = ChatWindowDispatchProps & ChatWindowStandardProps;