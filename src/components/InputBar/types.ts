// InputBarStoreProps
// InputBarDispatchProps

export interface InputBarStandardProps { };

export interface InputBarState {
  message: string
}

export type InputBarProps = InputBarStandardProps & InputBarState;