// InputBarStoreProps
// InputBarDispatchProps

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

export type InputBarProps = InputBarStandardProps & InputBarState;