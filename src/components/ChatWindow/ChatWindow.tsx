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
      Socket.connectToSocket(userNickname);
      Socket.joinRoom(this.props.roomName);
      this.props.addUserToRoom(this.props.roomName, clientSocket.id, this.state.nickname);
      this.setState({ isLoggedIn: true })
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
            </div>
          )
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: ChatWindowDispatchProps) => ({
  addUserToRoom: (roomName: string, socketId: string, nickname: string) => 
                  dispatch(addUserToRoom(roomName, socketId, nickname))
});

export default connect<AppState, ChatWindowDispatchProps, any, any>(null, mapDispatchToProps)(ChatWindow);