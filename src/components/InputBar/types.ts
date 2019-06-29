// InputBarStoreProps
// InputBarDispatchProps

export interface InputBarStandardProps { 
  nickname: string
};

export interface InputBarState {
  message: string,  
}

export type InputBarProps = InputBarStandardProps & InputBarState;