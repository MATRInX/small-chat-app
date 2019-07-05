// InputBarStoreProps
// InputBarDispatchProps

export interface InputBarStandardProps { 
  nickname: string,
  roomName: string
};

export interface InputBarState {
  message: string,  
}

export type InputBarProps = InputBarStandardProps & InputBarState;