import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { Dispatch } from 'redux';
import * as Props from './types';
import { AppState } from '../../redux/store/configureStore';
import ChatWindow from '../ChatWindow/ChatWindow';
import { socket as clientSocket } from '../../index';
import Socket from '../../socket/index';
import { User } from '../../redux/store/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom, deleteUserFromRoom } from '../../redux/actions/socketIO/user';
import isUserLoggedInRoom from '../../redux/selectors/isUserLoggedInRoom';
import { createNewRoom, deleteRoom } from '../../redux/actions/socketIO/room';
import PrivRequestModal from '../PrivRequestModal/PrivRequestModal';
import { PrivRequestModalInfo } from '../PrivRequestModal/types';
import PrivRejectModal from '../PrivRejectInfoModal/PrivRejectInfoModal';
import { PrivRejectModalInfo } from '../PrivRejectInfoModal/types';
import RoomsList from '../RoomsList/RoomsList';
import 'react-tabs/style/react-tabs.css';

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

  onPrivRejection = (invitingUser: string,
    rejectingUser: string,
    invitingUserSocketId: string,
    roomName: string) => {
    // Show modal with information about rejection
    this.setState(state => {
      const newRejection: PrivRejectModalInfo = {
        invitingUser,
        isModalOpen: true
      };
      const rejections = [...state.rejections, newRejection];
      return { rejections };
    })
    Socket.to.disconnectFromRoom(roomName, invitingUserSocketId);
    this.props.deleteUserFromRoom(roomName, invitingUserSocketId);
    this.props.deleteRoom(roomName);
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

  rejectPrivInvitation = (invitingUser: string,
    myNickname: string,
    invitingUserSocketId: string,
    roomName: string) => {
    Socket.to.emitPrivRejection(invitingUser, myNickname, invitingUserSocketId, roomName);
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
      <Tabs>
        <TabList>
          <Tab>Select Your room!</Tab>
          {
            rooms.filter((singleRoom, index) => {
              return isUserLoggedInRoom(this.props.joinedUsers, singleRoom.roomName, clientSocket.id)
            }).map((singleRoom, index) => {
              return  <Tab key={index}>{singleRoom.roomName}</Tab>
            })
          }
        </TabList>
        <TabPanel><RoomsList rooms={this.props.rooms}/></TabPanel>
        {
          rooms.length > 0 && rooms.filter((singleRoom, index) => {
            return isUserLoggedInRoom(this.props.joinedUsers, singleRoom.roomName, clientSocket.id)
          }).map((singleRoom, index) => {
            return <TabPanel key={index}>
              <ChatWindow key={index} roomName={singleRoom.roomName} />
            </TabPanel>
          })
        }
      </Tabs>
    </div>
  }
}

const mapStateToProps: (store: AppState, ownProps: Props.ChatAppProps) => Props.ChatAppStateProps =
  (state, ownProps) => ({
    rooms: state.rooms,
    joinedUsers: state.joinedUsers
  });

  const mapDispatchToProps: (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.ChatAppDispatchProps) =>
    Props.ChatAppDispatchProps =
    (dispatch, ownProps) => ({
      addUserToRoom: (newUser: User) =>
        dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname)),
      createPrivateRoom: (roomName: string) => dispatch(createNewRoom(roomName, false, true)),
      deleteUserFromRoom: (roomName: string, socketId: string) => dispatch(deleteUserFromRoom(roomName, socketId)),
      deleteRoom: (roomName: string) => dispatch(deleteRoom(roomName))
    })

export default connect<Props.ChatAppStateProps, Props.ChatAppDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(ChatApp);