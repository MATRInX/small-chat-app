import { Message } from '../../redux/store/types';

export interface MessagesStoreProps {
  roomMessages: Message[]
}
export interface MessagesDispatchProps {
  addNewMessage: (roomName: string, nickname: string, message: string) => void
}
export interface MessagesStandardProps {
  roomName: string
}
export interface MessagesState {
  messages: string[]
};

export type MessagesProps = MessagesStoreProps & MessagesDispatchProps & MessagesStandardProps;