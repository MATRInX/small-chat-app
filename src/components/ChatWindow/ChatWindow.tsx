import React, { FormEvent } from 'react';
import { ChatWindowStandardProps, ChatWindowState } from './types';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';
import Socket from '../../socket/index';

export default class ChatWindow extends React.Component<ChatWindowStandardProps, ChatWindowState> {
  constructor(props: ChatWindowStandardProps) {
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