// PrivRequestModalStateProps
// PrivRequestModalDispatchProps
export interface PrivRequestModalStandardProps {
  isModalOpen: boolean,
  onRejectInvitation: (invitingUser: string, rejectingUser: string, invitingUserSocketId: string) => void,
  onConfirmInvitation: (nickname: string, socketId: string, roomName: string) => void,
  onCloseModal: () => void,
  invitingUser: string,
  invitingUserSocketId: string,
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
  invitingUserSocketId: string,
  myNickname: string,
  mySocketId: string
}