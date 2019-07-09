import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { User } from '../../redux/store/types';

export interface InputBarStoreProps {
  actualUser: User,
  typingsUsers: User[]
};

export interface InputBarDispatchProps {
  setUserTyping: (roomName: string, nickname: string, isTyping: boolean) => void
};

export interface InputBarStandardProps { 
  nickname: string,
  roomName: string
};

export interface InputBarState {
  message: string, 
  typings: boolean,
  typingsUsername: string,
  timeout: any
}

export type InputBarProps = InputBarStoreProps & InputBarDispatchProps & InputBarStandardProps;// & InputBarState;