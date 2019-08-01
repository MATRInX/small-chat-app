import React, { Component } from 'react';
import Modal from 'react-modal';
import * as Props from './types';

export default class PrivRejectInfoModal extends Component<Props.PrivRejectInfoModalProps> {
  constructor(props: Props.PrivRejectInfoModalProps) {
    super(props);
  }

  closeModal = () => {
    this.props.onCloseModal();
  }

  render() {
    const { isModalOpen, invitingUser, onCloseModal } = this.props;
    return (
      <div>
        <Modal 
          isOpen={isModalOpen}
          onRequestClose={onCloseModal}
        >
          User {invitingUser} has rejected your priv invitation.
          <button onClick={this.closeModal}>Close modal</button>
        </Modal>
      </div>
    )
  }
}

Modal.setAppElement('#app');