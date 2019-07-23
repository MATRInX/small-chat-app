// PrivRequestModalStateProps
// PrivRequestModalDispatchProps
export interface PrivRequestModalStandardProps {
  isModalOpen: boolean,
  onCloseModal: () => void
}
export interface PrivRequestModalState {
  isModalOpen: boolean
};

export type PrivRequestModalProps = PrivRequestModalStandardProps;