// MessagesStoreProps
// MessagesDispatchProps
export interface MessagesStandardProps { 
  roomName: string
}
export interface MessagesState {
  messages: string[]
};

export type MessagesProps = MessagesStandardProps & MessagesState;