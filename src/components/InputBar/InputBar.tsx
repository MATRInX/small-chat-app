import React, { FormEvent } from 'react';
import { socket } from '../../index';
import { InputBarProps, InputBarStandardProps, InputBarState } from './types';
import { SOCKET_EVENTS } from '../../utils/consts';

export default class InputBar extends React.Component<InputBarStandardProps, InputBarState> {
  constructor(props: InputBarStandardProps) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault(); 
    socket.emit(SOCKET_EVENTS.chatMessage, this.state.message);
    this.setState({ message: '' });
  }

  onChange = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const message: string = target.value;
    this.setState({ message });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          id="message" 
          type="text" 
          autoComplete="off" 
          value={this.state.message} 
          onChange={this.onChange} 
        />
        <button>Send</button>
        <div>|{ this.state.message }|</div>
      </form>
    )
  }
}