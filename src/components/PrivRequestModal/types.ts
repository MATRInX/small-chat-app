// PrivRequestModalStateProps
// PrivRequestModalDispatchProps
export interface PrivRequestModalStandardProps {
  isModalOpen: boolean,
  onRejectInvitation: () => void,
  onConfirmInvitation: (nickname: string, socketId: string, roomName: string) => void,
  onCloseModal: () => void,
  invitingUser: string,
  myNickname: string,
  roomName: string,
  mySocketId: string
}
export interface PrivRequestModalState {
  // isModalOpen: boolean
};

export type PrivRequestModalProps = PrivRequestModalStandardProps;

export interface PrivRequestModalInfo {
  isModalOpen: boolean,
  roomName: string,
  invitingUser: string,
  myNickname: string,
  mySocketId: string
}