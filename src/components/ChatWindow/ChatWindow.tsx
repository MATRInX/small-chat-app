import React, { FormEvent } from 'react';
import { ChatWindowProps, ChatWindowStandardProps, ChatWindowState } from './types';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';
import Socket from '../../socket/index';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/socketIO';
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
      Socket.joinRoom('room');
      this.props.addUserToRoom('room', userNickname);
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoggedIn ? (
            <div>
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
              <InputBar nickname={this.state.nickname}/>
            </div>
          )
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: ChatWindowProps) => ({
  addUserToRoom: (roomName: string, userId: string) => dispatch(addUserToRoom(roomName, userId))
});

export default connect<AppState, ChatWindowProps, any, any>(null, mapDispatchToProps)(ChatWindow);