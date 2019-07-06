import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
// ChatWindowStateProps
export interface ChatWindowDispatchProps {
  addUserToRoom: (roomName: string, socketId: string, nickname: string) => SocketIOActionTypes
}
export interface ChatWindowStandardProps { 
  roomName: string
};
export interface ChatWindowState {
  nickname: string,
  isLoggedIn: boolean
};

export type ChatWindowProps = ChatWindowDispatchProps & ChatWindowStandardProps;