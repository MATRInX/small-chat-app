// ChatWindowStateProps
// ChatWindowDispatchProps
export interface ChatWindowStandardProps { };
export interface ChatWindowState {
  nickname: String;
};

export type ChatWindowProps = ChatWindowStandardProps & ChatWindowState;