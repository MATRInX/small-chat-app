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
          shouldCloseOnOverlayClick={false}
          className="modal__window"
          overlayClassName="modal__overlay"
        >
          <div className="modal__information">
            User {invitingUser} has rejected your priv invitation.
          </div>
          <div className="modal__buttons">
            <button className="btn" onClick={this.closeModal}>Close modal</button>
          </div>
        </Modal>
      </div>
    )
  }
}

Modal.setAppElement('#app');