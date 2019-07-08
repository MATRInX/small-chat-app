import React, { FormEvent } from 'react';
import { socket } from '../../index';
import { InputBarStandardProps, InputBarState } from './types';
import { SOCKET_EVENTS } from '../../utils/consts';
import Socket from '../../socket/index';

export default class InputBar extends React.Component<InputBarStandardProps, InputBarState> {
  constructor(props: InputBarStandardProps) {
    super(props);
    this.state = {
      message: '',      
      typings: false,
      typingsUsername: '',
      timeout: undefined
    };
  }

  componentDidMount() {
    Socket.onUserTypings(this.setTypingsState);
  }

  onSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault(); 
    // socket.emit(SOCKET_EVENTS.chatMessage, this.state.message);
    Socket.sendMessage(this.props.roomName, this.props.nickname, this.state.message);
    this.setState({ message: '' });
  }

  onChange = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const message: string = target.value;
    this.setState({ message });
  }

  onKeydown = (event: FormEvent<EventTarget>): void => {
    // if (this.state.typings) {
      //  clearTimeout(this.state.timeout);
    // }
    clearTimeout(this.state.timeout);
        
    Socket.emitUserTypings(this.props.roomName, this.props.nickname, true);
    const timeout = setTimeout(() => {
      Socket.emitUserTypings(this.props.roomName, this.props.nickname, false);
      console.log('timeout finished');
    }, 5000);    
    this.setState({ timeout })
  }

  setTypingsState = (userNickname: string, isTypings: boolean) => {
    this.setState({ typings: isTypings, typingsUsername: userNickname });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      {this.state.typings ? <div>User {`${this.state.typingsUsername}`}is typings...</div> : <div></div>}
        <span>{this.props.nickname}</span>
        <input 
          id="message" 
          type="text" 
          autoComplete="off" 
          value={this.state.message} 
          onChange={this.onChange} 
          onKeyDown={this.onKeydown}
        />
        <button>Send</button>
      </form>
    )
  }
}