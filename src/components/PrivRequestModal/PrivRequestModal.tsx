import React, { Component } from 'react';
import Modal from 'react-modal';
import * as Props from './types';

export default class PrivRequestModal extends Component<Props.PrivRequestModalProps, Props.PrivRequestModalState> {
  constructor(props: Props.PrivRequestModalProps){
    super(props);
  }

  confirmInvitation = () => {
    const { roomName, myNickname, mySocketId } = this.props;
    this.props.onConfirmInvitation(myNickname, mySocketId, roomName);
    this.props.onCloseModal();
  }

  rejectInvitation = () => {
    const { invitingUser, myNickname, invitingUserSocketId, roomName } = this.props;
    this.props.onRejectInvitation(invitingUser, myNickname, invitingUserSocketId, roomName);
    this.props.onCloseModal();
  }

  render() {
    const { isModalOpen, onCloseModal, invitingUser, roomName } = this.props;
    return <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        shouldCloseOnOverlayClick={false}
        className="modal__window"
        overlayClassName="modal__overlay"
      >
        <div className="modal__information">
          User {invitingUser} ask you to join priv room: {roomName}
        </div>
        <div className="modal__buttons">
          <button className="btn" onClick={this.confirmInvitation}>Approve invitation and join room</button>
          <button className="btn" onClick={this.rejectInvitation}>Reject invitation</button>
        </div>
      </Modal>
    </div>
  }
}

Modal.setAppElement('#app');