import React, { FormEvent } from 'react';
import * as Props from './types';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';
import Socket from '../../socket/index';
import { socket as clientSocket } from '../../index';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom, deleteUserFromRoom, deleteUser } from '../../redux/actions/socketIO/user';
import { deleteRoom } from '../../redux/actions/socketIO/room';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import { User } from '../../redux/store/types';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import isUserLoggedInRoom from '../../redux/selectors/isUserLoggedInRoom';
import getActualUserForRoom from '../../redux/selectors/getActualUserForRoom';
import getUsersForRoom from '../../redux/selectors/getUsersInRoom';


export class ChatWindow extends React.Component<Props.ChatWindowProps, Props.ChatWindowState> {
  constructor(props: Props.ChatWindowProps) {
    super(props);
    this.state = {
      nickname: ''
    };
  }

  componentDidMount() {
    const actualUser: User = {
      socketId: clientSocket.id,
      roomName: this.props.roomName,
      nickname: this.props.actualUser.nickname,
      isTyping: false
    }
    Socket.fromAndTo.onGetYourUserToSocket(actualUser, this.props.roomName);
    Socket.from.onDeleteUserFromRoom(this.onDeleteUserFromRoom);
    Socket.from.disconnectUser(this.onDeleteUser)
  }

  disconn = () => {
    Socket.to.disconnectFromRoom(this.props.roomName, clientSocket.id);
  }

  componentDidUpdate(prevProps: Props.ChatWindowProps) {
    const actualUser: User = {
      socketId: clientSocket.id,
      roomName: this.props.roomName,
      nickname: this.props.actualUser.nickname,
      isTyping: false
    }
    if (prevProps.actualUser.nickname !== actualUser.nickname) {
      Socket.fromAndTo.onGetYourUserToSocket(actualUser, this.props.roomName);
    }
  }

  onChange = (event: FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    const nickname: string = target.value;
    this.setState({ nickname });
  }

  onSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    const userNickname: string = this.state.nickname;
    if (userNickname !== '') {
      const newUser: User = {
        roomName: this.props.roomName,
        socketId: clientSocket.id,
        nickname: this.state.nickname,
        isTyping: false
      };
      Socket.to.joinRoom(newUser);
      this.props.addUserToRoom(newUser);
      Socket.from.onNewUserInRoom(this.props.addUserToRoom);
      // this.setState({ nickname: '' });
    }
  }

  onDeleteUserFromRoom = (roomName: string, socketId: string) => {
    this.props.deleteUserFromRoom(roomName, socketId);
  }

  onDeleteUser = (socketId: string) => {
    this.props.deleteUser(socketId);
  }

  onRoomLeave = () => {
    Socket.to.disconnectFromRoom(this.props.roomName, clientSocket.id)
    this.props.deleteUserFromRoom(this.props.roomName, clientSocket.id);
    this.props.deleteRoom(this.props.roomName);
  }

  render() {

    return (
      <div >
        {/* <h1 className="chat-window__header">Room {this.props.roomName}</h1> */}
        {
          !this.props.isUserLoggedInRoom ? (
            <span>No logged user</span>
            // <div>
            //   <form onSubmit={this.onSubmit}>
            //     <input
            //       type="text"
            //       onChange={this.onChange}
            //       value={this.state.nickname}
            //       placeholder="Enter your nickname..."
            //     />
            //     <button>Join chat room</button>
            //   </form>
            // </div>
          ) : (
            <div className="chat-window">
              <h1 className="chat-window__header">Room {this.props.roomName}</h1>
              <button className="btn btn--logout" onClick={this.onRoomLeave}>Leave room</button>
              <Messages nickname={this.props.actualUser.nickname} roomName={this.props.roomName}/>
              <InputBar nickname={this.props.actualUser.nickname} roomName={this.props.roomName}/>
              <OnlineUsers roomName={this.props.roomName}/>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps: (store: AppState, ownProps: Props.ChatWindowProps) => Props.ChatWindowStoreProps =
  (store, ownProps) => ({
    isUserLoggedInRoom: isUserLoggedInRoom(store.joinedUsers, ownProps.roomName, clientSocket.id),
    actualUser: getActualUserForRoom(store.joinedUsers, ownProps.roomName, clientSocket.id),
    usersInRoom: getUsersForRoom(store.joinedUsers, ownProps.roomName)
  });

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.ChatWindowDispatchProps) => ({
  addUserToRoom: (newUser: User) =>
    dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname)),
  deleteUserFromRoom: (roomName: string, socketId: string) =>
    dispatch(deleteUserFromRoom(roomName, socketId)),
  deleteUser: (socketId: string) =>
    dispatch(deleteUser(socketId)),
  deleteRoom: (roomName: string) =>
    dispatch(deleteRoom(roomName))
});

export default connect<Props.ChatWindowStoreProps, Props.ChatWindowDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(ChatWindow);