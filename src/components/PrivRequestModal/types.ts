// PrivRequestModalStateProps
// PrivRequestModalDispatchProps
export interface PrivRequestModalStandardProps {
  isModalOpen: boolean,
  onCloseModal: () => void,
  invitingUser: string,
  roomName: string
}
export interface PrivRequestModalState {
  // isModalOpen: boolean
};

export type PrivRequestModalProps = PrivRequestModalStandardProps;