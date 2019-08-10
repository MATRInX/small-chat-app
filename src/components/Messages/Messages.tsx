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

  __Unounted = false;

  componentDidMount() {
    Socket.from.onRoomMessage(this.addMessage);
  }

  addMessage = (roomName: string, nickname:string, message: string) => {
    if (roomName === this.props.roomName) {
      if (!this.__Unounted) {
        this.setState({ messages: [...this.state.messages, nickname+' '+message] });
      }
    }
  }

  componentWillUnmount() {
    this.__Unounted = true;
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