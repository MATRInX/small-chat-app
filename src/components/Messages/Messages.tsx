import React from 'react';
import { MessagesStandardProps, MessagesState } from './types';
import Socket from '../../socket/index';

export default class Messages extends React.Component<MessagesStandardProps, MessagesState> {
  constructor(props: MessagesStandardProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    Socket.from.onRoomMessage(this.addMessage);
  }

  addMessage = (roomName: string, nickname:string, message: string) => {
    if (roomName === this.props.roomName) {
      this.setState({ messages: [...this.state.messages, nickname+' '+message] });
    }
  }

  render() {
    return (
      <ul id="messages">
      {
        this.state.messages.length > 0 ? (
          this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
          )
        )
        ) : (
        <span>No messages...</span>
        )
      }
      </ul>
    )
  }
}