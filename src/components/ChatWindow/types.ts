// ChatWindowStateProps
// ChatWindowDispatchProps
export interface ChatWindowStandardProps { };
export interface ChatWindowState {
  nickname: string,
  isLoggedIn: boolean
};

export type ChatWindowProps = ChatWindowStandardProps & ChatWindowState;