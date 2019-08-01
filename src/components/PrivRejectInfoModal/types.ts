// PrivRejectInfoModalStateProps
// PrivRejectInfoModalDispatchProps

export interface PrivRejectModalInfo {
  isModalOpen: boolean,
  invitingUser: string
};

export interface PrivRejectInfoModalStandardProps extends PrivRejectModalInfo {
  onCloseModal: () => void
}

// PrivRejectInfoModalState

export type PrivRejectInfoModalProps = PrivRejectInfoModalStandardProps;