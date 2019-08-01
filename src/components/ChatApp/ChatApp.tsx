import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ChatWindow from '../ChatWindow/ChatWindow';
import * as Props from './types';
import { AppState } from '../../redux/store/configureStore';
import Socket from '../../socket/index';
import { User } from '../../redux/store/types';
import PrivRequestModal from '../PrivRequestModal/PrivRequestModal';
import PrivRejectModal from '../PrivRejectInfoModal/PrivRejectInfoModal';
import { PrivRequestModalInfo } from '../PrivRequestModal/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/user';
import { createNewRoom } from '../../redux/actions/socketIO/room';
import { PrivRejectInfoModalStandardProps, PrivRejectModalInfo } from '../PrivRejectInfoModal/types';

export class ChatApp extends Component<Props.ChatAppProps, Props.ChatAppState> {
  constructor(props: Props.ChatAppProps) {
    super(props);
    this.state = {
      invitations: [],
      rejections: []
    }
  }

  componentDidMount() {
    Socket.from.onPrivInvitation(this.onPrivInvitation);
    Socket.from.onPrivRejection(this.onPrivRejection);
  }

  onPrivInvitation = (actualUser: User, newUser: User, roomName: string) => {
    this.setState(state => {
      const newInvitation: PrivRequestModalInfo = {
        isModalOpen: true,
        invitingUser: actualUser.nickname,
        invitingUserSocketId: actualUser.socketId,
        myNickname: newUser.nickname,
        roomName,
        mySocketId: newUser.socketId
      };
      const invitations = [...state.invitations, newInvitation];
      return { invitations };
    });
  }

  onPrivRejection = (invitingUser: string, rejectingUser: string, invitingUserSocketId: string) => {
    // Show modal with information about rejection
    console.log(`User ${invitingUser} has reject your priv invitation.`);
    this.setState(state => {
      const newRejection: PrivRejectModalInfo = {
        invitingUser,
        isModalOpen: true
      };
      const rejections = [...state.rejections, newRejection];
      return { rejections };
    })
  }

  confirmPrivInvitation = (nickname: string, socketId: string, roomName: string) => {
    const newUser: User = {
      roomName,
      socketId,
      nickname,
      isTyping: false
    }
    this.props.createPrivateRoom(roomName);
    Socket.to.joinRoom(newUser);
    this.props.addUserToRoom(newUser);
  }

  rejectPrivInvitation = (invitingUser: string, myNickname: string, invitingUserSocketId: string) => {
    console.log(`ChatApp = rejection priv inv`);
    Socket.to.emitPrivRejection(invitingUser, myNickname, invitingUserSocketId);
  }

  closePrivInvitationModal = (indexToClose: number) => {
    this.setState(state => {
      const invitations = state.invitations.filter((item, index) => index !== indexToClose);
      return { invitations };
    });
  }

  closePrivRejectionModal = (indexToClose: number) => {
    this.setState(state => {
      const rejections = state.rejections.filter((item, index) => index !== indexToClose);
      return { rejections };
    })
  }

  render(){
    const { rooms } = this.props;
    const { invitations, rejections } = this.state;
    return <div>      
      {
        (invitations.length > 0 && invitations.map((item, index) => (
          <PrivRequestModal 
            key={index}
            isModalOpen={item.isModalOpen} 
            onConfirmInvitation={this.confirmPrivInvitation}
            onRejectInvitation={this.rejectPrivInvitation}
            onCloseModal={() => this.closePrivInvitationModal(index)}
            myNickname={item.myNickname}
            invitingUser={item.invitingUser}
            invitingUserSocketId={item.invitingUserSocketId}
            mySocketId={item.mySocketId}
            roomName={item.roomName}
          />
          ))
        )
      }
      {
        (rejections.length > 0 && rejections.map((item, index) => (
          <PrivRejectModal 
            key={index}
            isModalOpen={item.isModalOpen}
            onCloseModal={() => this.closePrivRejectionModal(index)}
            invitingUser={item.invitingUser}
          />  
        )))
      }      
      {
        rooms.length > 0 ? (
          rooms.map((singleRoom, index) => {
            return <ChatWindow key={index} roomName={singleRoom.roomName} />
          })
        ) : (
          <div>There is no rooms...</div>
        )
      }
    </div>
  }      
}

const mapStateToProps: (store: AppState, ownProps: Props.ChatAppProps) => Props.ChatAppStateProps = 
  (state, ownProps) => ({
    rooms: state.rooms
  });

  const mapDispatchToProps: (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.ChatAppDispatchProps) =>
    Props.ChatAppDispatchProps = 
    (dispatch, ownProps) => ({
      addUserToRoom: (newUser: User) => 
        dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname)),
      createPrivateRoom: (roomName: string) => dispatch(createNewRoom(roomName, false, true)),
    })

export default connect<Props.ChatAppStateProps, Props.ChatAppDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(ChatApp);