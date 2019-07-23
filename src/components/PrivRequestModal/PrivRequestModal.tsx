import React, { Component } from 'react';
import Modal from 'react-modal';
import * as Props from './types';

export default class PrivRequestModal extends Component<Props.PrivRequestModalProps, Props.PrivRequestModalState> {
  constructor(props: Props.PrivRequestModalProps){
    super(props);
    // this.state = {
    //   isModalOpen: this.props.isModalOpen
    // }
  }

  // openModal = () => {
  //   this.setState({ isModalOpen: true })
  // }

  // closeModal = () => {
  //   this.setState({ isModalOpen: false });
  // }

  render() {
    const { isModalOpen } = this.props;
    return <div>
      {/* <button onClick={this.openModal}>Trigger Modal</button> */}
      <Modal 
        isOpen={isModalOpen}
        onRequestClose={this.props.onCloseModal}
      >
        User {this.props.invitingUser} ask you to join priv room: {this.props.roomName}
        <button onClick={this.props.onCloseModal}>Close modal</button>
      </Modal>
    </div>
  }
}

Modal.setAppElement('#app');