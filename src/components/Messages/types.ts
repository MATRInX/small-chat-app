// MessagesStoreProps
// MessagesDispatchProps
export interface MessagesStandardProps { }
export interface MessagesState {
  messages: string[]
};

export type MessagesProps = MessagesStandardProps & MessagesState;