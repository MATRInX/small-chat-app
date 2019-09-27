import React from 'react';
import { Message } from '../../redux/store/types';

export interface MessagesStoreProps {
  roomMessages: Message[]
}
export interface MessagesDispatchProps {
  addNewMessage: (roomName: string, nickname: string, message: string) => void
}
export interface MessagesStandardProps {
  nickname: string,
  roomName: string
}
export interface MessagesState {
  messages: string[],
  ref: React.RefObject<HTMLLIElement>
};

export type MessagesProps = MessagesStoreProps & MessagesDispatchProps & MessagesStandardProps;