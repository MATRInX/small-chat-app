import React, { FormEvent } from 'react';
import { ChatWindowProps, ChatWindowDispatchProps, ChatWindowState } from './types';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';
import Socket from '../../socket/index';
import { socket as clientSocket } from '../../index';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/user';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import { User } from '../../redux/store/types';
import OnlineUsers from '../OnlineUsers/OnlineUsers';

export class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {
  constructor(props: ChatWindowProps) {
    super(props);
    this.state = {
      nickname: '',
      isLoggedIn: false
    };
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
      Socket.connectToSocket(userNickname);
      Socket.joinRoom(newUser);
      this.props.addUserToRoom(newUser);
      this.setState({ isLoggedIn: true });
      Socket.onGetYourUserToSocket(newUser);
      Socket.onNewUserInRoom(this.props.addUserToRoom);
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoggedIn ? (
            <div>
              <h1>Room {this.props.roomName}</h1>
              <form onSubmit={this.onSubmit}>
                <input 
                  type="text"
                  onChange={this.onChange} 
                  value={this.state.nickname} 
                  placeholder="Enter your nickname..."
                />
                <button>Join chat room</button>
              </form>
            </div>
          ) : (
            <div>
              <Messages />
              <InputBar nickname={this.state.nickname} roomName={this.props.roomName}/>
              <OnlineUsers roomName={this.props.roomName}/>
            </div>
          )
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: ChatWindowDispatchProps) => ({
  addUserToRoom: (newUser: User) => 
                  dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname))
});

export default connect<AppState, ChatWindowDispatchProps, any, any>(null, mapDispatchToProps)(ChatWindow);