import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
// ChatWindowStateProps
export interface ChatWindowDispatchProps {
  addUserToRoom: (roomName: string, userId: string) => SocketIOActionTypes
}
export interface ChatWindowStandardProps { };
export interface ChatWindowState {
  nickname: string,
  isLoggedIn: boolean
};

export type ChatWindowProps = ChatWindowDispatchProps & ChatWindowStandardProps;