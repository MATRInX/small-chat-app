import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ChatWindow from '../ChatWindow/ChatWindow';
import * as Props from './types';
import { AppState } from '../../redux/store/configureStore';
import Socket from '../../socket/index';
import { User } from '../../redux/store/types';
import PrivRequestModal from '../PrivRequestModal/PrivRequestModal';
import { PrivRequestModalInfo } from '../PrivRequestModal/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/user';
import { createNewRoom } from '../../redux/actions/socketIO/room';

export class ChatApp extends Component<Props.ChatAppProps, Props.ChatAppState> {
  constructor(props: Props.ChatAppProps) {
    super(props);
    this.state = {
      invitations: []
    }
  }

  componentDidMount() {
    Socket.from.onPrivInvitation(this.onPrivInvitation);
  }

  onPrivInvitation = (actualUser: User, newUser: User, roomName: string) => {
    this.setState(state => {
      const newInvitation: PrivRequestModalInfo = {
        isModalOpen: true,
        invitingUser: actualUser.nickname,
        myNickname: newUser.nickname,
        roomName,
        mySocketId: newUser.socketId
      };
      const invitations = [...state.invitations, newInvitation];
      return { invitations };
    });
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

  rejectPrivInvitation = () => {

  }

  closeModal = (indexToClose: number) => {
    this.setState(state => {
      const invitations = state.invitations.filter((item, index) => {
        return index !== indexToClose;         
      });
      return { invitations };
    });
  }

  render(){
    const { rooms } = this.props;
    const { invitations } = this.state;
    return <div>      
      {
        (invitations.length > 0 && invitations.map((item, index) => (
          <PrivRequestModal 
            key={index}
            isModalOpen={item.isModalOpen} 
            onConfirmInvitation={this.confirmPrivInvitation}
            onRejectInvitation={this.rejectPrivInvitation}
            onCloseModal={() => this.closeModal(index)}
            myNickname={item.myNickname}
            invitingUser={item.invitingUser}
            mySocketId={item.mySocketId}
            roomName={item.roomName}
          />
          ))
        )
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